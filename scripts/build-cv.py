#!/usr/bin/env python3
"""Rebuild public/Utku-Karakaya-CV.pdf in the existing letter-size CV structure.

Carlito (metric-compatible with Calibri) is registered when present. The script
looks in /tmp/fonts and common system font directories.
"""

from pathlib import Path

from reportlab.lib.colors import Color, black
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Utku-Karakaya-CV.pdf"
PAGE_W, PAGE_H = letter
LEFT = 72
RIGHT = 72
CONTENT_W = PAGE_W - LEFT - RIGHT
RULE = Color(0.55, 0.55, 0.55)

FONT_CANDIDATES = [
    Path("/tmp/fonts"),
    Path("/usr/share/fonts/truetype/crosextra"),
    Path("/usr/share/fonts/truetype/carlito"),
]


def find_font(filename: str) -> Path:
    for directory in FONT_CANDIDATES:
        candidate = directory / filename
        if candidate.is_file():
            return candidate
    raise SystemExit(f"Missing font {filename}. Place Carlito TTFs in /tmp/fonts.")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Carlito", str(find_font("Carlito-Regular.ttf"))))
    pdfmetrics.registerFont(TTFont("Carlito-Bold", str(find_font("Carlito-Bold.ttf"))))
    pdfmetrics.registerFont(TTFont("Carlito-Italic", str(find_font("Carlito-Italic.ttf"))))
    pdfmetrics.registerFontFamily(
        "Carlito",
        normal="Carlito",
        bold="Carlito-Bold",
        italic="Carlito-Italic",
        boldItalic="Carlito-Bold",
    )


def styles() -> dict[str, ParagraphStyle]:
    base = ParagraphStyle(
        "body",
        fontName="Carlito",
        fontSize=11,
        leading=14,
        textColor=black,
        alignment=TA_LEFT,
        spaceAfter=0,
    )
    return {
        "section": ParagraphStyle(
            "section",
            parent=base,
            fontName="Carlito-Bold",
            fontSize=13,
            leading=16,
            spaceBefore=0,
            spaceAfter=8,
        ),
        "body": base,
        "body_gap": ParagraphStyle("body_gap", parent=base, spaceAfter=10),
        "label": ParagraphStyle(
            "label",
            parent=base,
            fontName="Carlito-Bold",
            leading=14,
        ),
        "bullet": ParagraphStyle("bullet", parent=base, leftIndent=12, bulletIndent=0, leading=15),
        "small": ParagraphStyle("small", parent=base, fontSize=10, leading=13),
    }


def draw_header_footer(canvas, doc, total_pages: int) -> None:
    canvas.saveState()
    canvas.setFillColor(black)
    canvas.setFont("Carlito", 8)
    canvas.drawRightString(PAGE_W - RIGHT, PAGE_H - 46, "Utku Karakaya")
    canvas.drawRightString(PAGE_W - RIGHT, PAGE_H - 56, "Curriculum Vitae")
    canvas.setFont("Carlito", 10)
    canvas.drawRightString(PAGE_W - RIGHT, 40, f"Page {doc.page} of {total_pages}")
    canvas.restoreState()


def draw_cover(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFillColor(black)
    canvas.setFont("Helvetica-Bold", 28)
    canvas.drawString(145, PAGE_H - 176, "Utku KARAKAYA")
    canvas.setFont("Helvetica", 28)
    canvas.drawString(145, PAGE_H - 210, "CURRICULUM VITAE")
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(105, PAGE_H - 286, "PERSONAL DETAILS")

    rows = [
        ("Surname", "Karakaya"),
        ("First Name", "Utku"),
        ("Date of Birth", ""),
        ("Place of Residence", "Eindhoven, Netherlands"),
        ("Nationality", "Turkish"),
        ("Driving License", "Yes"),
        ("", ""),
        ("E-mail", "k4utku@gmail.com"),
        ("Phone", ""),
    ]
    y = PAGE_H - 314
    for label, value in rows:
        if not label and not value:
            y -= 8
            continue
        canvas.setFont("Helvetica", 12)
        canvas.drawString(105, y, label)
        canvas.drawString(213, y, f": {value}" if label else "")
        y -= 14
    canvas.restoreState()


def label_value_table(pairs: list[tuple[str, str]], style: dict[str, ParagraphStyle], label_width: float = 134):
    data = [
        [Paragraph(label, style["label"]), Paragraph(value, style["body"])]
        for label, value in pairs
    ]
    table = Table(data, colWidths=[label_width, CONTENT_W - label_width])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
        )
    )
    return table


def bullets(items: list[str], style: dict[str, ParagraphStyle]):
    flow = []
    for item in items:
        flow.append(Paragraph(f"- {item}", style["bullet"]))
    return flow


def role_block(role: dict, style: dict[str, ParagraphStyle], heading: str | None = None):
    parts = []
    if heading:
        parts.append(Paragraph(heading, style["section"]))
        parts.append(Spacer(1, 6))
    parts.append(
        HRFlowable(width="100%", thickness=0.6, color=RULE, spaceBefore=2, spaceAfter=8)
    )
    parts.append(
        label_value_table(
            [
                ("Period:", role["period"]),
                ("Company:", role["company"]),
                ("Role:", role["role"]),
            ],
            style,
            label_width=90,
        )
    )
    parts.append(Spacer(1, 12))
    parts.append(Paragraph("<b>Project Description:</b>", style["body"]))
    parts.append(Spacer(1, 2))
    for paragraph in role["description"]:
        parts.append(Paragraph(paragraph, style["body_gap"]))
    parts.append(Spacer(1, 4))
    parts.append(Paragraph("<b>Tasks and Responsibilities:</b>", style["body"]))
    parts.append(Spacer(1, 2))
    parts.extend(bullets(role["tasks"], style))
    parts.append(Spacer(1, 8))
    parts.append(Paragraph("<b>Tools and Methods:</b>", style["body"]))
    parts.append(Spacer(1, 2))
    parts.extend(bullets(role["tools"], style))
    return parts


def build_story(style: dict[str, ParagraphStyle]):
    story = [NextPageTemplate("body"), PageBreak()]

    story.append(Paragraph("PROFILE &amp; AMBITION", style["section"]))
    story.append(
        Paragraph(
            "<b>Hi, I’m Utku!</b> I’m a detail-oriented Software Development Engineer in Test and Python developer with a strong foundation in software systems, focusing on code quality, efficiency, and automation.",
            style["body_gap"],
        )
    )
    story.append(
        Paragraph(
            "I have an education background in Engineering (BSc.) and Remote Sensing (MSc.) from Middle East Technical University, which has honed my systematic and analytical approach to problem-solving.",
            style["body_gap"],
        )
    )
    story.append(
        Paragraph(
            "Over the past 6+ years, I’ve specialized in Python development, scripting, and test automation, with extensive experience in debugging, workflow optimization, and system improvement. I currently work at Forescout Technologies Inc. as a Software Development Engineer in Test, developing automation tools — often with AI — that accelerate teams across the company, not only one test suite, in the cybersecurity domain. Before that, at Calvi R&amp;D B.V., I contributed to transforming the billing experience for leading communication service providers such as Vodafone, KPN, Deutsche Telekom, and T-Mobile. My work there involved developing an automation suite using Playwright, Python, and Pytest to reduce customer complaints and enhance process efficiency, alongside writing automated API tests with Postman and optimizing workflows through Dockerized environments. I’ve also leveraged Microsoft Azure for scalable cloud solutions and MSSQL for data-driven insights, aligning with Calvi’s mission to enrich customer experiences.",
            style["body_gap"],
        )
    )
    story.append(
        Paragraph(
            "In my broader career, I’ve worked on projects for industry-leading clients like BMW, VW AG, Daimler AG, Huawei, and Ericsson. My contributions include the development and validation of embedded navigation systems and map services, as well as software testing for mobile and CRM systems. At Huawei, I tested and improved mobile applications such as Petal Maps, while at Ericsson, I provided testing services for critical billing and CRM systems.",
            style["body_gap"],
        )
    )
    story.append(
        Paragraph(
            "My technical expertise spans Python, Docker, Linux, Jenkins, and various CI/CD tools, including Git and GitHub Actions, alongside test automation frameworks like Playwright and Robot Framework. I’m skilled in both web and mobile application testing, automating workflows, and boosting system reliability. I’ve also utilized JIRA, Confluence, and ZephyrScale for effective project management within Agile/Scrum environments.",
            style["body_gap"],
        )
    )
    story.append(
        Paragraph(
            "Collaboration is central to my roles, where I’ve worked with cross-functional teams to meet project goals. Whether it’s streamlining processes with Python scripts or identifying critical software defects, my focus remains on delivering robust and user-friendly solutions. Through these experiences, I’ve cultivated a keen eye for detail and a proactive approach to continuous improvement, and I’m eager to apply my skills to tackle challenging projects and drive innovation.",
            style["body"],
        )
    )
    story.append(PageBreak())

    story.append(Paragraph("EDUCATION", style["section"]))
    story.append(
        label_value_table(
            [
                (
                    "2022 - Current",
                    "Remote Sensing - Master of Science - Middle East Technical University, Ankara, Turkey<br/>Advisor: <i>Prof. Dr. Mehmet Lutfi Suzen</i><br/>Status: On-going",
                ),
                (
                    "2013 - 2019",
                    "Bachelor of Science - Middle East Technical University, Ankara, Turkey",
                ),
            ],
            style,
        )
    )
    story.append(Spacer(1, 12))
    story.append(Paragraph("LANGUAGES", style["section"]))
    story.append(
        label_value_table(
            [
                ("English", "Professional Proficiency"),
                ("Turkish", "Native"),
            ],
            style,
        )
    )
    story.append(Spacer(1, 12))
    story.append(Paragraph("HOBBIES", style["section"]))
    story.append(
        Paragraph(
            "I love high technology related gadgets and devices, following technology and innovation news. I am very interested in Machine Learning/Deep Learning, Cybersecurity. In my free time I try to hack machines, trying to find vulnerabilities by using some plaforms like tryhackme/hackthebox. I like building DIY devices like drones and their components such as flying control unit by using RaspberryPi/Arduino. Also very interested in basketball and even played professionally in my university years in a sports club called Turkish Telecom. After my basketball career, I also worked as a professional basketball referee in the Turkish Basketball League.",
            style["body_gap"],
        )
    )
    story.append(Paragraph("SKILLS", style["section"]))
    story.append(
        label_value_table(
            [
                ("Programming Languages:", "Python, Bash, SQL"),
                ("Databases:", "Oracle, SQLite, MSSQL"),
                ("Operating System:", "Linux, MacOS, Windows, Android, IOS"),
                (
                    "Apps and Tools:",
                    "• Automation Tools: Pytest, Playwright, Robot Framework (Selenium, Appium), Postman<br/>• Version Control Systems: Git, SVN<br/>• Containerization &amp; CI/CD: Docker, Github Actions, Jenkins, Kubernetes<br/>• Test Management Tools: JIRA, HP ALM, Zephyr<br/>• Other Tools: SoapUI, Confluence",
                ),
                ("Cloud:", "AWS, Microsoft Azure, Bitbucket"),
                (
                    "Test Methodologies:",
                    "Black Box Testing, White Box Testing, Regression Testing, Functional Testing, Database Testing, API Testing, User Acceptance Testing (UAT) Support, Performance Testing (Latency, Battery Usage, CPU/Memory), Compatibility Testing, End-to-End Testing",
                ),
            ],
            style,
        )
    )
    story.append(PageBreak())

    roles = [
        {
            "heading": "PROFESSIONAL EXPERIENCE",
            "period": "01 November 2025 - Current",
            "company": "Forescout Technologies Inc. – Eindhoven, Netherlands",
            "role": "Software Development Engineer in Test",
            "description": [
                "At Forescout Technologies Inc. in Eindhoven, I work as a Software Development Engineer in Test in the cybersecurity domain. I develop automation tools — often with AI — that accelerate teams across the company, not only one test suite. The job is to find the friction in how teams deliver, then ship tools that take that friction away.",
            ],
            "tasks": [
                "Developing automation tools that accelerate teams across the company.",
                "Finding friction in delivery and test workflows, then shipping tools that remove it.",
                "Applying AI where it helps teams move faster, beyond a single owned test suite.",
                "Supporting cybersecurity product teams with practical automation.",
            ],
            "tools": [
                "Agile/Scrum",
                "Python, Pytest, Playwright",
                "Git, GitHub Actions",
                "Docker",
                "AI-assisted automation",
            ],
        },
        {
            "period": "01 April 2025 - 31 October 2025",
            "company": "CALVI-Insight – Tilburg, Netherlands",
            "role": "Software Test Automation Engineer / QA",
            "description": [
                "At Calvi R&amp;D B.V., I developed an automation suite for the company portal using Playwright, Python, and Pytest to transform the billing experience for leading communication service providers such as Vodafone, KPN, BT, Deutsche Telekom, Telefónica Germany, T-Mobile, Proximus, and TELUS, reducing customer complaints and enhancing process efficiency. Created and maintained Python scripts to optimize invoice validation workflows and wrote automated API tests with Postman to improve system reliability. Dockerized processes to standardize development and testing environments, while troubleshooting Python issues to ensure high performance. Worked within Agile/Scrum methodologies to strengthen team coordination and utilized JIRA, Confluence, and ZephyrScale tools to streamline project management. Integrated version control and CI/CD pipelines using Git and GitHub Actions. Deployed scalable cloud solutions with Microsoft Azure services and leveraged MSSQL for data analysis, extracting valuable insights from billing data. These efforts reduced call volumes related to invoices, accelerated payment cycles, boosted customer satisfaction, and turned bills into revenue generators, aligning with Calvi’s mission to enrich customer experiences.",
            ],
            "tasks": [
                "Developing automation suite for company portal using Playwright, Python, Pytest",
                "Developing and maintaining Python scripts.",
                "Writing automated API tests with Postman",
                "Dockerizing processes and troubleshooting Python issues.",
            ],
            "tools": [
                "Agile/Scrum",
                "Python, Pytest, MSSQL, Postman, Playwright",
                "Git",
                "JIRA, Confluence, ZephyrScale",
                "Docker, Kubernetes, GithubActions",
                "Microsoft Azure",
            ],
        },
        {
            "period": "01 Jan 2022 - 01 Jan 2024 via YER B.V., 01 Jan 2024 - 31 March 2025 via NavInfo Europe B.V.",
            "company": "NavInfo Europe B.V. – Eindhoven, Netherlands",
            "role": "Python Developer and Software Test Engineer",
            "description": [
                "<b>Production &amp; Operations Department</b>",
                "Developed Python automation scripts to validate map databases for clients such as BMW, Daimler, VW, and Audi, simplifying complex processes. Used Docker to automate and standardize development and testing environments, making workflows consistent and scalable. Created BDD test scenarios in Python to improve automation and increase efficiency. Applied SQL and Python libraries for data extraction, transformation, and analysis, providing valuable insights for map validation. Led a team to build custom Python tools that reduced repetitive tasks, saving time and improving project efficiency. Leveraged AWS and Microsoft Azure services to deploy and manage scalable cloud solutions, ensuring seamless delivery of validated products to clients. Troubleshot and fixed Python code issues, ensuring high performance and reliability. Worked on projects integrating Python with CI/CD pipelines using tools like Git, Bitbucket, and Jenkins. Managed the Python codebase, maintaining version control and clean coding practices for better teamwork. Built internal tools using Python and XML, improving operational processes and saving resources. Supported end-to-end product delivery by utilizing cloud-based infrastructure to ensure timely and reliable outcomes for customers.",
            ],
            "tasks": [
                "Validating map products and navigation systems.",
                "Developing and maintaining Python scripts.",
                "Automating workflows",
                "Dockerizing processes and troubleshooting Python issues.",
            ],
            "tools": [
                "Agile/Scrum",
                "Python, Bash, SQL, Robot Framework",
                "Git, Bitbucket",
                "JIRA, Confluence, Zephyr",
                "Docker, Jenkins",
                "AWS, Microsoft Azure",
            ],
        },
        {
            "period": "04/2021 to 01/2022",
            "company": "HUAWEI Research&amp;Development Center - Istanbul, Turkey",
            "role": "Software Test Engineer",
            "description": [
                "<b>Huawei Mobile Services Department</b>",
                "Developed Python-based tools and scripts to optimize testing workflows and support the Huawei Mobile Services ecosystem, including the Petal Maps navigation application. Conducted data analysis using Python to evaluate performance metrics such as latency, battery consumption, and CPU/memory usage, providing actionable insights for optimization. Designed and implemented Python scripts for automating functional and performance testing, significantly reducing manual effort and enhancing test reliability. Debugged and fixed Python code issues, improving the stability and efficiency of internal testing frameworks. Collaborated with cross-functional teams to automate workflows using the Robot Framework and integrated solutions with Python-based libraries. Maintained and organized the code repository, ensuring consistent version control and clear documentation of updates. Provided Python-based solutions for analyzing GPS data and logs collected during onsite field tests to validate real-world application performance.",
            ],
            "tasks": [
                "Black Box, White Box, Functional, Regression Tests",
                "Conducting performance testing for latency, battery consumption, and CPU/memory usage.",
                "Performing onsite field tests to collect GPS and application logs in real-world environments.",
                "Designing and executing manual and automated test cases.",
                "Automating workflows using Robot Framework to optimize testing efficiency.",
                "Identifying and documenting software defects and collaborating with developers to resolve them.",
                "Generating detailed reports and presenting findings to stakeholders.",
            ],
            "tools": [
                "Agile/Scrum",
                "Python, Robot Framework",
                "SVN",
                "Android Studio",
                "Postman",
                "Huawei Cloud Dragon",
            ],
        },
        {
            "period": "11/2019 to 04/2021",
            "company": "ERICSSON Research&amp;Development Center - Ankara, Turkey",
            "role": "Software Test Engineer",
            "description": [
                "At Ericsson, I was part of the software testing team responsible for billing and CRM systems for Turk Telekom, a leading telecommunication company in Turkey. My role involved ensuring the reliability and functionality of critical billing processes and customer relationship management tools. I developed comprehensive test plans and test cases tailored to both functional and non-functional requirements, to deliver high-quality software solutions.",
                "My work included regression testing to ensure new releases did not impact existing functionalities, along with API testing to verify backend service integration. I also performed deployment risk assessments and collaborated with stakeholders to identify and mitigate potential issues. Supported UAT tests and preparation of test environments.",
                "Additionally, I am involved in generating detailed reports such as status updates, risk analyses, and test closure documentation. These reports informed decision-making processes, ensuring smooth software rollouts. My ability to coordinate with cross-functional teams allowed me to identify and resolve critical defects promptly, minimizing downtime and enhancing user satisfaction.",
            ],
            "tasks": [
                "Developing and executing functional, regression, and API test cases to ensure the integrity of billing and CRM systems.",
                "Collaborating with developers, business analysts, and project managers to identify system requirements and potential risks.",
                "Performing compatibility and usability testing to ensure consistent performance across different devices and environments.",
                "Conducting end-to-end testing to validate the integration of billing modules with CRM workflows.",
                "Preparing detailed deployment risk assessments to ensure smooth rollouts.",
                "Generating comprehensive test reports, including status updates, defect logs, and risk analysis documents.",
                "Analyzing defects, prioritizing them based on impact, and verifying fixes.",
                "Maintaining and updating test environments to reflect production-like conditions.",
                "Supporting user acceptance testing (UAT) by guiding stakeholders through test results and system functionality.",
            ],
            "tools": [
                "Agile/Scrum",
                "Jira, HP ALM",
                "Apache Tomcat",
                "SQL, Bash",
                "SOAP",
            ],
        },
    ]

    for index, role in enumerate(roles):
        if index:
            story.append(PageBreak())
        story.extend(role_block(role, style, role.get("heading")))
    return story


def make_doc(path: Path, total_pages: int) -> BaseDocTemplate:
    doc = BaseDocTemplate(
        str(path),
        pagesize=letter,
        title="Utku-Karakaya-CV",
        author="Utku Karakaya",
    )
    cover_frame = Frame(0, 0, 1, 1, id="cover", showBoundary=0)
    body_frame = Frame(
        LEFT,
        58,
        CONTENT_W,
        PAGE_H - 58 - 72,
        id="body",
        showBoundary=0,
    )
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover),
            PageTemplate(
                id="body",
                frames=[body_frame],
                onPage=lambda canvas, doc: draw_header_footer(canvas, doc, total_pages),
            ),
        ]
    )
    return doc


def main() -> None:
    register_fonts()
    style = styles()
    story = build_story(style)
    probe = Path("/tmp/cv-probe.pdf")
    make_doc(probe, total_pages=1).build(story)
    import pymupdf

    total = pymupdf.open(probe).page_count
    make_doc(OUTPUT, total_pages=total).build(build_story(style))
    print(f"Wrote {OUTPUT} ({total} pages)")


if __name__ == "__main__":
    main()
