import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Experience.css";
import Footer from "./Footer";

type ExperienceItem = {
  id?: number;        // backend will add this, but keep optional
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  tech: string;
};

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    getExperiences();
  }, []);

  const getExperiences = async () => {
    try {
      // NOTE: singular "experience.json" to match your file name
      const resp = await axios.get<ExperienceItem[]>("/data/experiences.json");
      setExperiences(resp.data);
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  return (
    <div>
      <section className="experience-section">
        <h1 className="experience-heading">Experience</h1>

        <div className="timeline">
          {experiences.map((exp, index) => {
            const dates = `${exp.startDate} - ${exp.endDate}`;

            return (
              <div
                className="timeline-item"
                key={exp.id ?? `${exp.company}-${dates}-${index}`}
              >
                <div className="timeline-icon">
                  <i className="fas fa-briefcase" />
                </div>

                <article className="timeline-card">
                  <h2 className="exp-role">{exp.role}</h2>
                  <h3 className="exp-company">{exp.company}</h3>

                  <p className="exp-location">{exp.location}</p>
                  <p className="exp-dates">{dates}</p>

                  <p className="exp-description">{exp.description}</p>
                  <p className="exp-tech">
                    <strong>Skills:</strong> {exp.tech}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Experience;
