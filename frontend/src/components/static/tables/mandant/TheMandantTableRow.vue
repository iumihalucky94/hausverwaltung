<template>
    <tbody>
        <tr v-for="item, index in  group_tasks " :key="index" class="border-2 border-slate-300 h-10">
            <td class="border border-slate-300 max-w-xs overflow-hidden"
                :class="{ 'light-green-background': rowHasChanges(group_name, index) }">
                <p class="text-thirdly flex">{{ item }}</p>
            </td>
            <td class="overflow-hidden">
                <select name="supplier_id" :id="item.index" @input="getInfo($event, 'supplier_id', index, group_name)">
                    <option value="none">none </option>
                    <option v-for="(supplier, index) in supplierList" :key="index" :value="supplier.id"
                        :selected="checkInMandantExistence('supplier', item, supplier.id)">
                        {{ supplier.name }}
                    </option>
                </select>
            </td>
            <td>
                <input class="w-full h-full" type="datetime-local" :key="index"
                    @input="getDate($event, 'send_date', index, group_name)"
                    :value="getExistedMandantTime('send_date', item)">
            </td>
            <td>
                <select name="reminder" :id="item.index" @input="getInfo($event, 'reminder', index, group_name)">
                    <option v-for="( reminder, index ) in  reminderOptionsList " :key="index" :value="reminder.value"
                        :selected="checkInMandantExistence('reminder', item, reminder.value)">
                        {{ reminder.name }}
                    </option>
                </select>

            </td>
            <td>
                <input class="w-full h-full" type="date" :key="index"
                    @input="getDate($event, 'deadline', index, group_name)"
                    :value="getExistedMandantTime('deadline', item)">
            </td>
            <td>
                <select name="frequency" :id="item.index" @input="getInfo($event, 'frequency', index, group_name)">
                    <option v-for="( frequency, index ) in  frequencyOptionsList " :key="index" :value="frequency.value"
                        :selected="checkInMandantExistence('frequency', item, frequency.value)">
                        {{ frequency.name }}
                    </option>
                </select>
            </td>
            <td>
                <select name="template" :id="item.index" @input="getInfo($event, 'template', index, group_name)">
                    <option v-for="( mail, index ) in  mailTemplate " :key="index" :value="mail"
                        :selected="checkInMandantExistence('mail', item, mail)">
                        {{ mail }}
                    </option>
                </select>
            </td>
            <td>
                <select name="weather" class="w-full" :id="item.index"
                    @input="getInfo($event, 'weather', index, group_name)">
                    <option v-for="( weather, index ) in  weatherOptionsList " :key="index" :value="weather.value"
                        :selected="checkInMandantExistence('weather', item, weather.value)">
                        {{ weather.name }}
                    </option>
                </select>
            </td>
            <td>
                <button :class="buttonClass('status', item)" @click="changeRecordStatus(index, group_name, item)">
                    {{ buttonText('status', item) }}
                </button>

            </td>
            <td class="flex w-full h-full items-center justify-center">
                <button
                    class="w-8 h-8 pr-2 bg-thirdly rounded-xl flex items-center justify-center hover:bg-green-600 text-white"
                    @click="saveChanges(index, group_name, item)">
                    <fai icon="fa-solid fa-floppy-disk" class="text-white ml-2" />
                </button>
                <button
                    class="w-8 h-8 pr-2 bg-red-600 rounded-xl flex items-center justify-center hover:bg-red-800 text-white"
                    @click="deleteRecord(index, group_name, item)">
                    <fai icon="fa-solid fa-trash" class="text-white ml-2" />
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
            existedMandantList: {},
            isMandantListed: false,
            listedIndexOfIexistedMandant: false,
            valueChanged: 'red'
        }
    },
    watch: {
        existedMandantList: {
            deep: true, // This ensures the watcher will notice changes in nested properties
            handler(newValue, oldValue) {
                // console.log("existedMandantList changed!", newValue);
            },
        },
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
            } else {
                console.log('some important fields are missing!')
                delete this.changesList[groupName][index];
                // If there are no more changes in this group, delete the group key as well
                if (Object.keys(this.changesList[groupName]).length === 0) {
                    delete this.changesList[groupName];
                }
                // Force update to make sure the UI reflects the change
                this.$forceUpdate();
            }
        },
        async deleteRecord(index, groupName, taskName) {
            console.log(this.existedMandantList, index, groupName, taskName)
            let mandantIndex
            Object.entries(this.existedMandantList).forEach(([key, value]) => {
                if (this.existedMandantList[key].task_name == taskName) { mandantIndex = key }
            })
            delete this.existedMandantList[mandantIndex]
            this.$forceUpdate();
        },
        async changeRecordStatus(index, groupName, taskName) {
            let dataJSON = {}
            dataJSON['group_name'] = groupName
            dataJSON['task_name'] = taskName
            dataJSON['object_id'] = this.$router.currentRoute._rawValue.params.object_id
            console.log(dataJSON)
            await this.$axios.post('http://localhost:3000/mandant/change_status', dataJSON, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                if (res.data.success) {
                    this.existedMandantList[index].status = res.data.value
                    this.$forceUpdate();
                } else {
                    console.error(res.data.message)
                }
            }).catch(e => {
                console.log(e)
            })
        },
        async getData() {
            try {
                await this.$axios.get('http://localhost:3000/supplier/get_list')
                    .then((res) => {
                        if (res.data.success) {
                            this.supplierList = res.data.message;
                        }
                    })
                    .catch((e) => {
                        console.error(e)
                    })
            } catch (error) {
                console.error(error);
            }
        },
        async getMandants() {
            try {
                await this.$axios.get(`http://localhost:3000/mandant/list/${this.$router.currentRoute._rawValue.params.object_id}`)
                    .then((res) => {
                        if (res.data.success) {
                            this.existedMandantList = res.data.message
                        }
                    })
                    .catch(
                        (e) => {
                            console.error(e)
                        }
                    )
            } catch (error) {
                console.error(error);
            }
        },
        checkInMandantExistence(col_name, row_name, value) {
            for (let item in this.existedMandantList) {
                switch (col_name) {
                    case 'supplier':
                        if (this.existedMandantList[item].task_name == row_name && this.existedMandantList[item].supplier_id == value) {
                            return true
                        }
                    case 'frequency':
                        if (this.existedMandantList[item].task_name == row_name && this.existedMandantList[item].frequency == value) {
                            return true
                        }
                    case 'reminder':
                        if (this.existedMandantList[item].task_name == row_name && this.existedMandantList[item].reminder == value) {
                            return true
                        }
                    case 'mail':
                        if (this.existedMandantList[item].task_name == row_name && this.existedMandantList[item].template == value) {
                            return true
                        }
                    case 'weather':
                        if (this.existedMandantList[item].task_name == row_name && this.existedMandantList[item].weather == value) {
                            return true
                        }
                    case 'status':
                        if (this.existedMandantList[item].task_name == row_name && this.existedMandantList[item].status) {
                            return this.existedMandantList[item].status
                        }
                }
            }
        },
        buttonClass(option, item) {
            const status = this.checkInMandantExistence(option, item);
            switch (status) {
                case 'Active':
                    return 'w-20 h-8 bg-thirdly rounded-xl flex items-center justify-center hover:bg-green-600 text-white';
                case 'Disable':
                    return 'w-20 h-8 bg-red-400 rounded-xl flex items-center justify-center hover:bg-red-600 text-white';
                default:
                    return 'w-20 h-8 bg-gray-400 rounded-xl flex items-center justify-center text-white'; // Default case
            }
        },
        buttonText(option, item) {
            const status = this.checkInMandantExistence(option, item);
            return status || 'Unknown'; // Return 'Unknown' or any default text if status is not found
        },
        getExistedMandantTime(col_name, row_name) {
            for (let item in this.existedMandantList) {
                if (this.existedMandantList[item].task_name == row_name && col_name in this.existedMandantList[item]) {
                    switch (col_name) {
                        case 'send_date':
                            return this.existedMandantList[item][col_name].replace(' ', 'T').slice(0, -5)
                        case 'deadline':
                            return this.existedMandantList[item][col_name].split('T')[0]
                    }
                }
            }
        }
    },
    mounted() {
        this.getData()
        this.getMandants()
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