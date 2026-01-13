import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const getInitialState = () => {
  try {
    const savedData = localStorage.getItem('formData')
    if (savedData) {
      return JSON.parse(savedData)
    }

    const cookieData = Cookies.get('formData')
    if (cookieData) {
      return JSON.parse(cookieData)
    }
  } catch (error) {
    console.error('Error loading stored form data:', error)
  }

  return {
    name: '',
    title: '',
    description: '',
    gender: '',
    skills: [],
    category: '',
    date: '',
    image: null,
    video: null,
    submitted: false,
    editDraft: null,
  }
}

const initialState = getInitialState()

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {

    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value
    },

    toggleSkill: (state, action) => {
      const skill = action.payload
      const skills = state.skills
      state.skills = skills.includes(skill)
        ? skills.filter(s => s !== skill)
        : [...skills, skill]
    },

    startEdit: (state) => {
      state.editDraft = {
        name: state.name,
        title: state.title,
        description: state.description,
        gender: state.gender,
        skills: [...state.skills],
        category: state.category,
        date: state.date,
        image: state.image,
        video: state.video,
      }
    },

    updateEditField: (state, action) => {
      state.editDraft[action.payload.field] = action.payload.value
    },

    toggleEditSkill: (state, action) => {
      const skill = action.payload
      const skills = state.editDraft.skills
      state.editDraft.skills = skills.includes(skill)
        ? skills.filter(s => s !== skill)
        : [...skills, skill]
    },

    saveEdit: (state) => {
      Object.assign(state, state.editDraft)
      state.editDraft = null

      localStorage.setItem('formData', JSON.stringify(state))
      Cookies.set('formData', JSON.stringify(state), { expires: 3 })
    },

    cancelEdit: (state) => {
      state.editDraft = null
    },

    submitForm: (state) => {
      state.submitted = true
      localStorage.setItem('formData', JSON.stringify(state))
      Cookies.set('formData', JSON.stringify(state), { expires: 3 })
    },

    clearForm: () => {
      localStorage.removeItem('formData')
      Cookies.remove('formData')
      return getInitialState()
    },
  },
})

export const {
  updateField,
  toggleSkill,
  startEdit,
  updateEditField,
  toggleEditSkill,
  saveEdit,
  cancelEdit,
  submitForm,
  clearForm,
} = formSlice.actions

export default formSlice.reducer
