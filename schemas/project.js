export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    },
    {
      name: 'liveLink',
      title: 'Live Link',
      type: 'url',
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of technologies used in the project'
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main features of the project'
    },
    {
      name: 'challenges',
      title: 'Challenges & Solutions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technical challenges faced and how they were overcome'
    },
    {
      name: 'learnings',
      title: 'Key Learnings',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Important insights gained from the project'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0'
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media
      };
    }
  }
};