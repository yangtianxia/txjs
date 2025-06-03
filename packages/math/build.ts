import { builder } from '../../scripts/build'

builder({
  root: true,
  iife: true,
  globalName: 'TMath',
  name: 'index',
  filepath: 'index.ts',
})
