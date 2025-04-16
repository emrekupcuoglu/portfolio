function WorkExperience() {
  return (
    <>
      <h2 id="work" className="pb-8 text-4xl">
        Work Experience
      </h2>
      <div className="pb-12">
        <WorkName name="VAVACARS" date="Aug 2023 - Jul 2024" />

        <WorkExperienceItem
          bulletPoints={[
            "Spearheaded the integration of NetSuite, designing customized workflows to meet diverse business needs across accounting, maintenance, and requisition teams.",
            "Launched a role-based payment automation system interfacing with multiple banks, reducing payment processing from one week to 2 hours and amplifying productivity markedly.",
            "Orchestrated a comprehensive parts requisition workflow that minimized inter-team communication and reduced errors, resulting in a 50% productivity gain.",
            "Devised a robust database with filtering and logging features paired with a user-friendly accounting frontend, streamlining operations and elevating efficiency by 40%.",
            "Standardized invoicing and receipt generation systems, incorporating OCR and Zone Capture technologies, which boosted processing speeds by 70%.",
          ]}
        />
      </div>

      <div className="pb-12">
        <WorkName name="NOVACON" date="Apr 2023 - Aug 2024" />

        <WorkExperienceItem
          bulletPoints={[
            "Collaborated with high-profile clients including ERG, REEDER, CYBERARK, and TEMA, tailoring solutions to distinct business environments.",
            "Formulated innovative email and invoice template systems to enhance client communications and branding.",
            "Designed an adaptive currency exchange and payments framework based on real-time hourly rates.",
            "Migrated databases from legacy systems to NetSuite and local infrastructures for improved analytics and data science initiatives.",
          ]}
        />
      </div>
    </>
  );
}

export default WorkExperience;

function WorkName({
  name,
  date,
  role = "Software Developer",
}: {
  name: string;
  date?: string;
  role?: string;
}) {
  return (
    <div className="flex items-center justify-between pb-12">
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-green-400">{role}</p>
      </div>
      <p className="text-slate-300">{date}</p>
    </div>
  );
}

function WorkExperienceItem({ bulletPoints }: { bulletPoints: string[] }) {
  return (
    <ul className="list-disc text-green-300 [&_p]:text-white">
      {bulletPoints.map((point, index) => {
        return (
          <li key={index}>
            <p className="">{point}</p>
          </li>
        );
      })}
    </ul>
  );
}
