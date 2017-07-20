/**
 * Created by Administrator on 2017/7/19.
 */
var vm = new Vue({
    el:"#app",
    data:{
        productList:[],
        totalMoney:0,
        checkAll:false,
        totalPrice:0,
        deleteFlag:false,
        currentPro:''
    },
    mounted:function(){
        this.$nextTick(function () {
            this.cartView();
        });

    },
    filters:{
        formatMoney:function(value){
            return "￥"+value.toFixed(2);
        }
    },
    methods:{
        cartView:function () {
            var _this = this;
            this.$http.get("data/cartData.json",{"id":123}).then(function (res) {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.result.totalMoney
            })
        },
        changeNum:function (item,flag) {
            if(flag>0){
                item.productQuantity++;
            }
            else{
                item.productQuantity--;
                if(item.productQuantity<1){
                    item.productQuantity = 1;
                }
            }
        },
        selectedProduct:function (item) {
            if(typeof item.checkProduct == 'undefined'){
                this.$set(item,'checkProduct',true);
            }
            else{
                item.checkProduct = !item.checkProduct;
            }
            this.calcuTotalPrice();
        },
        ckeckAllPro:function (flag) {
            var _this = this;
            this.checkAll = flag;
            this.productList.forEach(function (item,index) {
                if(typeof item.checkProduct == 'undefined'){
                    _this.$set(item,'checkProduct',_this.checkAll);
                }
                else{
                    item.checkProduct = _this.checkAll;
                }
            })
            this.calcuTotalPrice();
        },
        calcuTotalPrice:function () {
            var _this = this;
            _this.totalPrice = 0;
            this.productList.forEach(function (item,index) {
                if(item.checkProduct){
                    _this.totalPrice += item.productPrice* item.productQuantity;
                }
            })
        },
        delPro:function (item) {
            this.currentPro = item;
            this.deleteFlag = true;
        },
        deleteProduct:function () {
            var index = this.productList.indexOf(this.currentPro);
            this.productList.splice(index,1);
            this.deleteFlag = false;
            this.calcuTotalPrice();
        }
    }
})
// Vue.filter();全局过滤器
Vue.filter("money",function (value,status) {
    return "￥"+value.toFixed(2) + status;
})