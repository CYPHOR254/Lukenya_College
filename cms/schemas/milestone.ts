import {defineType, defineField} from 'sanity'

export const milestone = defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year / Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'superscript',
      title: 'Superscript',
      type: 'string',
      description: 'Optional superscript text (e.g. "ST")',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Star', value: 'star'},
          {title: 'Shield', value: 'shield'},
          {title: 'Layers', value: 'layers'},
          {title: 'Archive', value: 'archive'},
          {title: 'Wifi', value: 'wifi'},
        ],
      },
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
