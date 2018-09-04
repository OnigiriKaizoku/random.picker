<template>
  <div>
    <div class="inputField">
      <input type="text" placeholder="Enter item name"
             @keydown.enter="addItem(currentItem)"
             v-model="currentItem">
          <b-button variant="success" size="sm" @click="addItem(currentItem)">Add to list</b-button>
    </div>

    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="3" class="itemsList">
          <h3>Items list</h3>
          <ul>
            <li v-for="(item, index ) in itemList" :key="index" @click="deleteItem(item)">{{item}}</li>
          </ul>
        </b-col>
        <b-col cols="2"></b-col>
        <b-col cals="3" class="randomField">
          <input type="text" placeholder="Enter count of random items" style="width: 50px"
                        v-model="rItemsCount"
                        @keydown.enter="selectRandomItem()">
          <b-button variant="primary" size="sm" @click="selectRandomItem()">Select random item</b-button>
          <ul style="margin-top: 5px;">
            <li v-for="(item, index) in randomItems" :key="index">{{item}}</li>
          </ul>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      itemList: [],
      currentItem: '',
      randomItems: [],
      rItemsCount: 1
    }
  },
  created () {
    this.itemList = JSON.parse(localStorage.getItem('rand_listOfItems')) || []
  },
  methods: {
    addItem (item) {
      this.itemList.push(item)
      this.currentItem = ''
      localStorage.setItem('rand_listOfItems', JSON.stringify(this.itemList))
    },
    deleteItem (item) {
      this.itemList.splice(this.itemList.indexOf(item), 1)
      localStorage.setItem('rand_listOfItems', JSON.stringify(this.itemList))
    },
    selectRandomItem () {
      let params = {
        min: 0,
        max: this.itemList.length,
        num: this.rItemsCount
      }
      this.randomItems = []
      if(this.itemList.length === 1)
        this.randomItems.push(this.itemList[0])
      else if(this.itemList.length === 0)
        this.randomItems = []
      else
        this.getRandomInt('get', params)
    },
    getRandomInt (m, paramsObj) {
      let that = this
      let params = {
        num: paramsObj.num || 1,
        min: paramsObj.min || 1,
        max: paramsObj.max || 10,
        base: paramsObj.base || 10,
        col: paramsObj.col || 1,
        format: paramsObj["format"] || "plain",
        rnd: paramsObj.rnd || "new"
      }
      let url = "https://www.random.org/integers/?num=" + params.num +
        "&min=" + params.min + "&max=" + params.max + "&base=" + params.base +
        "&col=" + params.col + "&format=" + params.format + "&rnd=" + params.rnd
      let method = m.toUpperCase()

      let xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      xhr.send()
      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return 0

        if (xhr.status != 200) {
          console.log( xhr.status + ': ' + xhr.statusText )
        } else {
          let randoms = xhr.responseText.replace(/\n/ig, '').split('')
          for (let i = 0; i < randoms.length; i++) {
            that.randomItems.push(that.itemList[randoms[i] - 1])
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .inputField {
    text-align: center;
  }
  li {
    border-radius: 3px;
    list-style: none;
    margin-bottom: 5px;
    min-width: 50px;
    margin-left: -40px;
  }
  .itemsList > ul > li:hover {
    background-color: lightskyblue;
    cursor: pointer;
  }
  .itemsList {
    text-align: center;
    min-height: 100px;
    max-height: 300px;
    max-width: 300px;
    margin-top: 100px;
  }
  .itemsList > ul {
    overflow: auto;
    max-height: 300px;
  }
  .randomField {
    vertical-align: top;
    margin-top: 100px;
  }
  .randomField > ul {
    overflow: auto;
    min-height: 100px;
    max-height: 300px;
    min-width: 200px;
    max-width: 300px;
  }
</style>
