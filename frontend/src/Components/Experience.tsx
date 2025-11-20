import { useState, useEffect } from 'react';
import axios from "axios";
import "../styles/Experience.css";
import Footer from './Footer';

type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  dates: string;
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
            const resp = await axios.get<ExperienceItem[]>("/data/experiences.json");
            setExperiences(resp.data);
        } catch (error) {
            console.log("Error retrieving data: ", error);
        }
    }

    return (
      <div>
        <section className="experience-section">
        <h1 className="experience-heading">Experience</h1>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className="timeline-item" key={exp.company + exp.dates}>
              <div className="timeline-icon">
                <i className="fas fa-briefcase" />
              </div>

              <article className="timeline-card">
                <h2 className="exp-role">{exp.role}</h2>
                <h3 className="exp-company">{exp.company}</h3>

                <p className="exp-location">{exp.location}</p>
                <p className="exp-dates">{exp.dates}</p>

                <p className="exp-description">{exp.description}</p>
                <p className="exp-tech">
                  <strong>Skills:</strong> {exp.tech}
                </p>
              </article>
            </div>
          ))}
        </div>
        </section>
        <Footer/>
      </div>
      
    );
}

export default Experience;