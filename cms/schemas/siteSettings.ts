import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'countdownTarget',
      title: 'Event Countdown Target Date',
      type: 'datetime',
    }),
    defineField({
      name: 'eventDateDisplay',
      title: 'Event Date Display Text',
      type: 'string',
      description: 'e.g. "November 28th, 2025"',
    }),
    defineField({
      name: 'eventDayTime',
      title: 'Event Day & Time Display',
      type: 'string',
      description: 'e.g. "Monday, 08:00 AM - 06:00 PM"',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Contact Address',
      type: 'text',
    }),
  ],
})
