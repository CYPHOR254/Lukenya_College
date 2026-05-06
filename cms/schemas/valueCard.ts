import {defineType, defineField} from 'sanity'

export const valueCard = defineType({
  name: 'valueCard',
  title: 'Value Card',
  type: 'document',
  description: 'Vision, Mission, Philosophy cards displayed on the About page',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconSvgPath',
      title: 'Icon SVG Path',
      type: 'text',
      description: 'The SVG path element markup for the icon',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
