Vue.createApp({
    data() {
        return{
            valueInput: '',
            needDoList: [],
            completelist:[]
        };
    },

    mounted(){
        if (localStorage.getItem('needDoList')){
            try{
                this.needDoList=JSON.parse(localStorage.getItem('needDoList'));
            } catch(e) {
                localStorage.removeItem('needDoList');
            }
        }
    
        if (localStorage.getItem('completelist')){
            try{
                this.completelist=JSON.parse(localStorage.getItem('completelist'));
            } catch(e) {
                localStorage.removeItem('completelist');
            }
        }
    },

    methods: {
        addTask () {
            if(!this.valueInput){
            return
            };
            this.needDoList.push({
                title: this.valueInput,
                id: Math.random()
            });
            this.valueInput = '';
            this.saveTasks();
            
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
            this.saveTasks();
            this.saveCompleteTask();
        },
        removeMask(index,type) {
            const toDoList = type === 'need' ? this.needDoList: this.completelist;
            toDoList.splice(index,1);
            this.saveTasks();
        },
        saveTasks() {
            const parsed = JSON.stringify(this.needDoList);
            localStorage.setItem('needDoList', parsed);

        },
        saveCompleteTask(){
            const parsed = JSON.stringify(this.completelist);
            localStorage.setItem('completelist', parsed);
        }
    }
}
).mount('#app');