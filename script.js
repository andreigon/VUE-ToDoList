Vue.createApp({
    data() {
        return{
            valueInput: '',
            needDoList: [],
            completelist:[],
        };
    },
    methods: {
        handlyInput(event){
            this.valueInput = event.target.value;
        },
        addTask () {
            if(this.valueInput===''){return};
            this.needDoList.push({
                title: this.valueInput,
                id: Math.random()
            });
            this.valueInput='';
        },
        doCheck (index,type) {
            if(type==='need'){
                const completeMask = this.needDoList.splice(index,1);
                this.completelist.push(...completeMask);
            }
            else{
                const noCompleteMask=this.completelist.splice(index,1);
                this.needDoList.push(...noCompleteMask);
            }
        },
        removeMask(index,type){
            const toDoList = type === 'need' ? this.needDoList: this.completelist;
            toDoList.splice(index,1);
        }
    }
}).mount('#app');