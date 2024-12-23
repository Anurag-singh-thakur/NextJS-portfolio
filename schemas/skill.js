export default {
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Skill Name',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Skill Image',
        type: 'image',
        options: {
          hotspot: true, 
        },
      },
    ],
  };