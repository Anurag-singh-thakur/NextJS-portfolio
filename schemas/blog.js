export default {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Blog Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'text',
      },
      {
        name: 'image',
        title: 'Blog Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'readMoreLink',
        title: 'Read More Link',
        type: 'url',
      },
    ],
  };