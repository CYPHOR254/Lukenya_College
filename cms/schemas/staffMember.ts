import {defineType, defineField} from 'sanity'

export const staffMember = defineType({
  name: 'staffMember',
  title: 'Staff Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role Identifier',
      type: 'string',
      description: 'Used for routing (e.g. principal, deputy-principal, engineering-hod, education-hod, registrar)',
      options: {
        list: [
          {title: 'Principal', value: 'principal'},
          {title: 'Deputy Principal', value: 'deputy-principal'},
          {title: 'Engineering HOD', value: 'engineering-hod'},
          {title: 'Education HOD', value: 'education-hod'},
          {title: 'Registrar', value: 'registrar'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'collegeHighlight',
      title: 'College Name Highlight',
      type: 'string',
      description: 'The word to highlight in the heading (e.g. "Lukenya")',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Message Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities List',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Optional list of responsibilities (used for Registrar)',
    }),
    defineField({
      name: 'closingParagraphs',
      title: 'Closing Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Optional closing paragraphs (used for Registrar)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})
