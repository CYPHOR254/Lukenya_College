import {defineType, defineField} from 'sanity'

export const schoolPage = defineType({
  name: 'schoolPage',
  title: 'School Page',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'School Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
    }),
    defineField({
      name: 'programmes',
      title: 'Programmes Offered',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'assessmentItems',
      title: 'Assessment Methods',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'trainingApproach',
      title: 'Training Approach',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'attachmentTags',
      title: 'Industrial Attachment Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'heroImage',
    },
  },
})
