<template>
  <div class="container-fluid">
    <div class="row">
      <div>

        <!-- start of textbox -->
        <div class="row teaxtbox">
          <div>
            {{ state.firstNumber }}
            {{ state.operation || '' }}
            {{ state.secondNumber || '' }}
          </div>
          <div v-if="state.result !== undefined">
            Result: {{ state.result }}
          </div>
        </div>
        <!-- end of textbox -->

        <!-- start of button design -->
        <div class="row commonbutton">
          <!-- first row -->
          <div class="col-md-2" v-for="operation in operations" :key="operation">
            <input type="submit" :value="operation" :key="operation" @click="event => setOperation(event.target.value)">
          </div>


          <!-- rendering numbers -->
          <div class="col-md-3" :key="number" v-for="number in numbers">
            <input type="submit" :key="number" :value="number" @click="event => setValue(event.target.value)">
          </div>
          <div class="col-md-3">
            <input type="submit" value="clear" id="del" @click="clearData">
          </div>
          <div class="col-md-3">
            <input type="submit" value="=" id="equal" @click="performOperation">
          </div>
          <!-- end of rendering numbers -->
        </div>

      </div>
    </div>
  </div>


</template>

<script>

import {reactive} from 'vue'
import store from '../store'

export default {
  name: "TheCalculator",
  setup() {
    const state = reactive({firstNumber: undefined, secondNumber: undefined, operation: undefined, result: undefined})
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const operations = ['squareRoot', 'sum', 'subtract', 'divide', 'multiply', 'randomString']

    function setValue(value) {
      this.state.result = undefined
      const isSettingFirstNumber = this.state.operation === undefined
      if (isSettingFirstNumber) {
        if (state.firstNumber) {
          this.state.firstNumber = Number(state.firstNumber + value)
        } else {
          this.state.firstNumber = value
        }
      } else {
        if (state.secondNumber) {
          this.state.secondNumber = state.secondNumber + value
        } else {
          this.state.secondNumber = value
        }
      }
    }

    async function setOperation(operation) {
      this.state.operation = operation
    }

    function clearData() {
      state.firstNumber = undefined
      state.secondNumber = undefined
      state.operation = undefined
    }

    async function performOperation() {
      console.log( 'perform')
      try {
        console.log( 'fetching')
        const operationResponse = await fetch('http://localhost:3000/operations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${store.state.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            operation: state.operation, params: {
              a: state.firstNumber,
              b: state.secondNumber
            }
          })
        });
        const responseAsJson = JSON.parse(JSON.stringify(await operationResponse.json()))
        if(operationResponse.status===200){
          this.state.result = responseAsJson.result
        } else {
          this.state.result = responseAsJson.message
        }

      } catch (e) {
        console.log(e, 'el mes')
        this.state.result = e.message
      }
      clearData()
    }

    return {
      state,
      clearData,
      numbers,
      operations,
      setValue,
      setOperation,
      performOperation
    }
  }
}
</script>

<style scoped>

span {
  color: #fff;
  padding: 16px;
}

.commonbutton input[type="submit"] {
  padding: 8px;
  background: #f2f2f2;
  border: none;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  margin-top: 15px;
  border-radius: 5px;
}


.conflict input[type="submit"]:focus, .commonbutton input[type="submit"]:focus {
  outline: none;
}

#del {
  background: #F40057;
  color: #fff;
}

#equal {
  background: #80C683;
  color: #fff;
}

</style>