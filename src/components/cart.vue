<template>
    <div>
        <p>{{name}}</p>
        <!-- 列表 -->
        <table border='1'>
            <tr>
                <th>#</th>
                <th>名称</th>
                <th>价格</th>
                <th>数量</th>
                <th>总价</th>
            </tr>
            <tr v-for="(item,i) in cart" :key="item.id" :class="{active:item.active}">
                <td><input type="checkbox" v-model="item.active"></td>
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>
                    <button @click="minus(i)">-</button>
                    {{item.count}}
                    <button @click="add(i)">+</button>
                </td>
                <td>{{item.price*item.count}}</td>
            </tr>
            <tr>
                <td colspan="3">{{activeCount}}/{{count}}</td>
                <td colspan="2">{{total}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['name'],
        data() {
            return {
                cart: JSON.parse(localStorage.getItem('cart')) || []
            }
        },
        created() {
            this.$bus.$on('addGood', good =>{
                const ret = this.cart.find(v=>v.id===good.id);
                if(ret){
                ret.count += 1;  
                }else{
                this.cart.push({
                    ...good,
                    count:1,
                    active:true
                })
                }
            })
        },
        methods: {
            minus(i) {
                const count = this.cart[i].count;
                if(count>1){
                    this.cart[i].count -= 1;
                }else{
                    this.remove(i);
                }
            },
            add(i){
                this.cart[i].count += 1;
            },
            remove(i){
                if(window.confirm('确认删除?')){
                    this.cart.splice(i, 1)
                }
            }
        },
        computed: {
            activeCount() {
                return this.cart.filter(v=>v.active).length;
            },
            count(){
                return this.cart.length;
            },
            total(){
                let num = 0;
                this.cart.forEach(c => {
                    if(c.active){
                    num += c.price*c.count;
                    }
                });
                return num
            }
        },
        watch: {
            cart: {
                handler(n){
                    localStorage.setItem('cart', JSON.stringify(n))
                },
                deep: true
            }
        },
    }
</script>

<style scoped>
    .active{
        color: green
    }
</style>