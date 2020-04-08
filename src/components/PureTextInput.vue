<template>
  <div class="input-container">
    <div class="input-label">{{ label }}</div>
    <input
      :data-id="dataIdProp"
      :id="id"
      :style="styleProp"
      type="text"
      :minLength="minLength"
      :maxlength="maxLength"
      :size="size || maxLength"
      :required="required"
      :pattern="pattern"
      @blur="onBlur"
      :disabled="!isEditing"
      v-model="inputVal"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    size: Number,
    maxLength: Number,
    minLength: Number,
    required: Boolean,
    pattern: RegExp, // regex obj
    dataIdProp: String,
    styleProp: Object,
    id: String,
    label: String,
    placeholder: String,
    valProp: String,
    isEditing: Boolean,
    onFocusProp: Function,
    onBlurProp: Function
  },

  computed: {
    inputVal: {
      get() {
        return this.valProp
      },
      set() {}
    }
  },

  methods: {
    onBlur(event) {
      if (this.onBlurProp) {
        this.inputVal = this.onBlurProp(event)
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.input-container {
  display: flex;
  flex-direction: column;
  margin: 1.5em 5em 0 0;
  align-items: flex-start;
}

.input-label {
  font-size: 24px;
  margin-bottom: 1em;
  align-self: flex-start;
}

input {
  align-self: stretch;
  border-radius: 7px;
  border: 1px solid $light-gray;
  font-size: 18px;
  padding: 0.5em;
  outline: 0;

  &:disabled {
    background-color: $disabled-gray;
    border: none !important;
  }

  &:hover {
    border: 1px solid $outline-blue;
  }

  &:focus {
    border: 1px solid $outline-blue;
  }
}
</style>
