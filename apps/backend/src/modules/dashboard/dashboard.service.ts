import { DashboardOverview } from "@dojo-portfolio/shared";

import * as projectRepository from "../projects/project.repository";
import * as skillRepository from "../skills/skill.repository";
import * as experienceRepository from "../experience/experience.repository";
import * as contactMessageRepository from "../contacts/contact.repository";

export const getOverview = async (): Promise<DashboardOverview> => {
  const [
    projects,
    featured_projects,
    skills,
    experiences,
    unread_messages,
    recent_messages,
  ] = await Promise.all([
    projectRepository.count(),
    projectRepository.countFeatured(),
    skillRepository.count(),
    experienceRepository.count(),
    contactMessageRepository.findUnreadCount(),
    contactMessageRepository.find({ page: 1, limit: 6, unread: false }),
  ]);

  const { messages } = recent_messages;

  return {
    stats: {
      projects,
      featured_projects,
      skills,
      experiences,
      unread_messages,
    },
    recent_messages: messages,
  };
};
