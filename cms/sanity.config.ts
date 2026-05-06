import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {
  siteSettings,
  facilitySlide,
  valueCard,
  milestone,
  amenity,
  programCategory,
  academicProgram,
  faqTopic,
  staffMember,
  schoolPage,
  galleryImage,
  newsArticle,
  programOption,
} from './schemas'

export default defineConfig({
  name: 'lukenya-college',
  title: 'Lukenya College CMS',

  // TODO: Replace with your actual Sanity project ID and dataset after running `sanity init`
  projectId: '3r5d1eeb',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('facilitySlide').title('Facility Slides'),
            S.documentTypeListItem('amenity').title('Amenities'),
            S.documentTypeListItem('milestone').title('Milestones'),
            S.documentTypeListItem('valueCard').title('Value Cards'),
            S.divider(),
            S.documentTypeListItem('programCategory').title('Program Categories'),
            S.documentTypeListItem('academicProgram').title('Academic Programs'),
            S.documentTypeListItem('programOption').title('Form Program Options'),
            S.divider(),
            S.documentTypeListItem('faqTopic').title('FAQ Topics'),
            S.divider(),
            S.documentTypeListItem('staffMember').title('Staff Members'),
            S.documentTypeListItem('schoolPage').title('School Pages'),
            S.divider(),
            S.documentTypeListItem('galleryImage').title('Gallery Images'),
            S.documentTypeListItem('newsArticle').title('News Articles'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [
      siteSettings,
      facilitySlide,
      valueCard,
      milestone,
      amenity,
      programCategory,
      academicProgram,
      faqTopic,
      staffMember,
      schoolPage,
      galleryImage,
      newsArticle,
      programOption,
    ],
  },
})
