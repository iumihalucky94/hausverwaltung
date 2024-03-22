<template>
    <tbody>
        <tr v-for="item, index in  group_tasks " :key="index" class="border-2 border-slate-300 h-10">
            <td class="border border-slate-300 max-w-xs overflow-hidden"
                :class="{ 'light-green-background': rowHasChanges(group_name, index) }">
                <p class="text-thirdly flex">{{ item }}</p>
            </td>
            <td class="border border-slate-300  overflow-hidden">
                <select name="supplier_id" :id="item.index" @input="getInfo($event, 'supplier_id', index, group_name)">
                    <option value="none">none </option>
                    <option v-for="(item, index) in supplierList" :key="index" :value="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </td>
            <td>
                <input class="w-full h-full" type="datetime-local" :key="index"
                    @input="getDate($event, 'send_date', index, group_name)">
            </td>
            <td>
                <select name="frequency" :id="item.index" @input="getInfo($event, 'frequency', index, group_name)">
                    <option v-for="( item, index ) in  frequencyOptionsList " :key="index" :value="item.value">
                        {{ item.name }}
                    </option>
                </select>
            </td>
            <td>
                <input class="w-full h-full" type="date" :key="index"
                    @input="getDate($event, 'deadline', index, group_name)">
            </td>
            <td>
                <select name="reminder" :id="item.index" @input="getInfo($event, 'reminder', index, group_name)">
                    <option v-for="( item, index ) in  reminderOptionsList " :key="index" :value="item.value">
                        {{ item.name }}
                    </option>
                </select>
            </td>
            <td>
                <select name="template" :id="item.index" @input="getInfo($event, 'template', index, group_name)">
                    <option v-for="( item, index ) in  mailTemplate " :key="index" :value="item">
                        {{ item }}
                    </option>
                </select>
            </td>
            <td>
                <select name="weather" class="w-full" :id="item.index"
                    @input="getInfo($event, 'weather', index, group_name)">
                    <option v-for="( item, index ) in  weatherOptionsList " :key="index" :value="item.value">
                        {{ item.name }}
                    </option>
                </select>
            </td>
            <td>
                <button
                    class="w-20 h-8 bg-thirdly rounded-xl flex items-center justify-center hover:bg-green-600 text-white"
                    @click="saveChanges(index, group_name, item)">
                    Save
                    <fai icon="fa-solid fa-floppy-disk" class="text-white ml-2" />
                </button>
            </td>
        </tr>

    </tbody>
</template>

<script>
import mandantTableInfo from '@/data/mandantTableInfo.json'

export default {
    props: {
        group_tasks: {
            required: true
        },
        group_name: {
            required: true
        }
        ,
        table_data: {
            required: false
        }
    }
    ,
    data() {
        return {
            supplierList: mandantTableInfo.select_supplier,
            reminderOptionsList: mandantTableInfo.select_reminder,
            frequencyOptionsList: mandantTableInfo.select_frequency,
            weatherOptionsList: mandantTableInfo.select_weather,
            mailTemplate: mandantTableInfo.select_email_template,
            selectedSupplier: '',
            changesList: {},
            valueChanged: 'red'
        }
    },
    methods: {
        async getDate(e, colName, rowIndex, group_name) {
            let formattedDate = new Date(e.target.value).toLocaleString();
            if (colName == 'deadline') {
                formattedDate = formattedDate.split(',')[0]
            }
            this.updateChangesList(group_name, rowIndex, { [colName]: formattedDate });
        },
        getInfo(e, colName, rowIndex, group_name) {
            if (typeof e.target.value === 'object' && e.target.value !== null) {
                this.updateChangesList(group_name, rowIndex, { [colName]: e.target.value.value });
            } else {
                this.updateChangesList(group_name, rowIndex, { [colName]: e.target.value });
            }

        },
        updateChangesList(groupName, rowIndex, newData) {
            // Ensure changesList is initialized for groupName and rowIndex
            this.changesList[groupName] = this.changesList[groupName] || {};
            this.changesList[groupName][rowIndex] = this.changesList[groupName][rowIndex] || {};

            // Update or delete the data based on the value
            Object.entries(newData).forEach(([key, value]) => {
                if (value === 'none') {
                    // Delete the key if value is 'none'
                    delete this.changesList[groupName][rowIndex][key];
                    if (Object.keys(this.changesList[groupName][rowIndex]).length == 0) {
                        delete this.changesList[groupName][rowIndex];
                    }
                    if (Object.keys(this.changesList[groupName]).length == 0) {
                        delete this.changesList[groupName];
                    }
                } else {
                    // Update or add the key with new value
                    this.changesList[groupName][rowIndex][key] = value;
                }
            });
        },
        rowHasChanges(groupName, rowIndex) {
            // Check if there are changes for the specific group and row
            return !!this.changesList[groupName] && !!this.changesList[groupName][rowIndex];
        },
        async saveChanges(index, groupName, taskName) {
            if (this.changesList[groupName] != undefined && Object.keys(this.changesList[groupName][index]).length > 0) {
                let dataJSON = { ...this.changesList[groupName][index] };
                dataJSON['group_name'] = groupName
                dataJSON['task_name'] = taskName
                dataJSON['object_id'] = this.$router.currentRoute._rawValue.params.object_id
                console.log(dataJSON)

                await this.$axios.post('http://localhost:3000/mandant/create', dataJSON, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    console.log(res);
                    if (res.data.success) {
                        if (this.changesList[groupName] && this.changesList[groupName][index]) {
                            delete this.changesList[groupName][index];
                            // If there are no more changes in this group, delete the group key as well
                            if (Object.keys(this.changesList[groupName]).length === 0) {
                                delete this.changesList[groupName];
                            }
                            // Force update to make sure the UI reflects the change
                            this.$forceUpdate();
                        }
                    }
                }).catch(error => {
                    console.error(error);
                });


                // await this.$axios.post('http://localhost:3000/mandant/create', dataJSON, {
                //     headers: {
                //         // Overwrite Axios's automatically set Content-Type
                //         'Content-Type': 'application/json'
                //     }
                // }).then(res => {
                //     console.log(res);
                //     // Now, clear the changes for this row
                //     if (this.changesList[groupName] && this.changesList[groupName][index]) {
                //         delete this.changesList[groupName][index];
                //         // If there are no more changes in this group, delete the group key as well
                //         if (Object.keys(this.changesList[groupName]).length === 0) {
                //             delete this.changesList[groupName];
                //         }
                //         // Force update to make sure the UI reflects the change
                //         this.$forceUpdate();
                //     }
                // }).catch(error => {
                //     console.error(error);
                // });

            } else {
                console.log('some important fields are missing!')
            }
        },
        async getData() {
            try {
                let response = await this.$axios.get('http://localhost:3000/supplier/get_list');
                this.supplierList = response.data;
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        },
        printData() {
            this.reminderOptionsList.forEach((e) => {
                // console.log(e.name)
            })
        }
    },
    mounted() {
        this.getData()
        this.printData()
    }
}
</script>


<style lang="scss" scoped>
select {
    max-width: 10rem;
}

#select-weather {
    max-width: 5rem;
}

.light-green-background {
    @apply bg-red-100; // Using Tailwind's bg-green-100 for a light green background
}
</style>