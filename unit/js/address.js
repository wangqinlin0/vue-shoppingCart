/**
 * Created by Administrator on 2017/7/19.
 */
var vm = new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        hipopNum:1
    },
    mounted:function () {
        var _this = this;
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (res) {
                _this.addressList = res.data.result;
            })
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function(item,index) {
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }
            })
        }
    }
})