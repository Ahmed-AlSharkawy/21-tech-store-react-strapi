const reducer = (state, action) => {
  if (action.type === 'TOGGLE_FORM') {
    return toggleIsMember(state)
  } else if (action.type === 'EMAIL_CHANGE') {
    const { isEmailPassed, isPassed } = handleEmailChange(state, action.payload)
    return {
      ...state,
      fields: { ...state.fields, email: action.payload },
      validation: { ...state.validation, isEmailPassed },
      behavior: { ...state.behavior, isPassed },
    }
  } else if (action.type === 'PASSWORD_CHANGE') {
    const { isPasswordPassed, isPassed } = handlePasswordChange(
      state,
      action.payload
    )
    return {
      ...state,
      fields: { ...state.fields, password: action.payload },
      validation: { ...state.validation, isPasswordPassed },
      behavior: { ...state.behavior, isPassed },
    }
  } else if (action.type === 'REPASSWORD_CHANGE') {
    const { isRePasswordPassed, isPassed } = handleRePasswordChange(
      state,
      action.payload
    )
    return {
      ...state,
      fields: { ...state.fields, rePassword: action.payload },
      validation: { ...state.validation, isRePasswordPassed },
      behavior: { ...state.behavior, isPassed },
    }
  } else if (action.type === 'USERNAME_CHANGE') {
    const { isUsernamePassed, isPassed } = handleUsernameChange(
      state,
      action.payload
    )
    return {
      ...state,
      fields: { ...state.fields, username: action.payload },
      validation: { ...state.validation, isUsernamePassed },
      behavior: { ...state.behavior, isPassed },
    }
  } else {
    throw new Error('Action type did not found')
  }
}

const toggleIsMember = (state) => {
  return {
    ...state,
    fields: resetForm(),
    validation: resetValidation(),
    behavior: { isMember: !state.behavior.isMember, isPassed: null },
  }
}

const resetForm = () => {
  return { email: '', password: '', rePassword: '', username: '' }
}

const resetValidation = () => {
  return {
    isEmailPassed: null,
    isPasswordPassed: null,
    isRePasswordPassed: null,
    isUsernamePassed: null,
  }
}

const handleEmailChange = (state, value) => {
  const { isMember } = state.behavior
  const { isPasswordPassed, isRePasswordPassed, isUsernamePassed } =
    state.validation

  let isEmailPassed = null,
    isPassed = null

  if (value) {
    isEmailPassed = true
    if (
      (isMember && isPasswordPassed) ||
      (!isMember && isPasswordPassed && isRePasswordPassed && isUsernamePassed)
    )
      isPassed = true
  } else {
    isEmailPassed = false
    isPassed = false
  }

  return { isEmailPassed, isPassed }
}

const handlePasswordChange = (state, value) => {
  const { isMember } = state.behavior
  const { isEmailPassed, isRePasswordPassed, isUsernamePassed } =
    state.validation

  let isPasswordPassed = null,
    isPassed = null

  if (value.length >= 6) {
    isPasswordPassed = true
    if (
      (isMember && isEmailPassed) ||
      (!isMember && isEmailPassed && isRePasswordPassed && isUsernamePassed)
    )
      isPassed = true
  } else {
    isPasswordPassed = false
    isPassed = false
  }

  return { isPasswordPassed, isPassed }
}

const handleRePasswordChange = (state, value) => {
  const { password } = state.fields
  const { isEmailPassed, isPasswordPassed, isUsernamePassed } = state.validation

  let isRePasswordPassed = null,
    isPassed = null

  if (value === password) {
    isRePasswordPassed = true
    if (isEmailPassed && isPasswordPassed && isUsernamePassed) isPassed = true
  } else {
    isRePasswordPassed = false
    isPassed = false
  }

  return { isRePasswordPassed, isPassed }
}

const handleUsernameChange = (state, value) => {
  const { isEmailPassed, isPasswordPassed, isRePasswordPassed } =
    state.validation

  let isUsernamePassed = null,
    isPassed = null

  if (value) {
    isUsernamePassed = true
    if (isEmailPassed && isPasswordPassed && isRePasswordPassed) isPassed = true
  } else {
    isUsernamePassed = false
    isPassed = false
  }

  return { isUsernamePassed, isPassed }
}

export default reducer
