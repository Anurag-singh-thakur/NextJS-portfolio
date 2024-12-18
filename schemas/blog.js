export default {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Blog Title',
        type: 'string',
        validation: Rule => Rule.required().min(10).max(100)
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Short Description',
        type: 'text',
        validation: Rule => Rule.required().min(20).max(300)
      },
      {
        name: 'content',
        title: 'Full Content',
        type: 'text',
        validation: Rule => Rule.required().min(100)
      },
      {
        name: 'images',
        title: 'Blog Images',
        type: 'array',
        of: [{
          type: 'image',
          options: {
            hotspot: true
          }
        }],
        validation: Rule => Rule.max(5)
      },
      {
        name: 'author',
        title: 'Author',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      },
      {
        name: 'readTime',
        title: 'Read Time (minutes)',
        type: 'number',
        validation: Rule => Rule.min(1).max(30)
      }
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author',
        media: 'images.0'
      },
      prepare(selection) {
        const {title, author, media} = selection
        return {
          title,
          subtitle: `By ${author}`,
          media
        }
      }
    }
  };