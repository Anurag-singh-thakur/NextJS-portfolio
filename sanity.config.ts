import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'my-portfolio',

  projectId: '5zy63g6k',
  dataset: 'my-portfolio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
