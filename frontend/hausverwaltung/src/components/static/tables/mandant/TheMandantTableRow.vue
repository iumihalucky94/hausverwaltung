<template>
    <tbody>
        <tr v-for="item, index in group_tasks" :key="index" class="border-2 border-slate-300 h-10">
            <td class="border border-slate-300 max-w-xs overflow-hidden">
                <p class="text-thirdly flex">{{ item }}</p>
            </td>
            <td class="border border-slate-300  overflow-hidden">
                <select name="supplier" id="supplier">
                    <option v-for="(item, index) in supplierList" :key="index" :value="item">
                        {{ item }}
                    </option>
                </select>
            </td>
            <td>
                <VueDatePicker locale="de" v-model="date" :enable-time-picker="false" :format="format(date)" />
            </td>
            <td>
                <select name="deadline" id="">
                    <option value="">In 5 days</option>
                    <option value="">In 1 week</option>
                    <option value="">In 2 weeks</option>
                    <option value="">In 3 weeks</option>
                    <option value="">In 1 month</option>
                    <option value="">In 2 months</option>
                </select>
            </td>
            <td>
                <VueDatePicker v-model="date" />
                <!-- <v-date-picker></v-date-picker> -->
            </td>
            <td>
                <select name="frequency" id="select-frequency">
                    <option value="">Every week</option>
                    <option value="">Every 2nd week</option>
                    <option value="">Every month</option>
                    <option value="">Every 2nd month</option>
                    <option value="">Every 3rd month</option>
                    <option value="">Every 4th month</option>
                    <option value="">In 5 month</option>
                </select>
            </td>
            <td>
                <select name="template" id="select-mail">
                    <option value="">Default</option>
                    <option value="">Outside work</option>
                    <option value="">Nice email</option>
                    <option value="">Special from Alex</option>
                    <option value="">Updated Logo</option>
                    <option value="">Nice and smooth</option>
                </select>
            </td>
            <td>
                <select name="template" id="select-weather">
                    <option value="">Snow</option>
                    <option value="">Rain</option>
                    <option value="">Cloud</option>
                    <option value="">Temp under 5 deg.</option>
                    <option value="">Temp under 0 deg.</option>
                    <option value="">Temp under -5 deg.</option>
                    <option value="">Temp over 10 deg.</option>
                    <option value="">Temp over 20 deg.</option>
                    <option value="">Temp over 30 deg.</option>

                </select>
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
        table_data: {
            required: false
        }
    }
    ,
    data() {
        return {
            date: new Date(),
            supplierList: mandantTableInfo.select_supplier,
            selectedSupplier: ''
        }
    },
    methods: {
        format(date) {
            // console.log(date)
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            // this.date = `${day}${month}.${year}`
        }
    },
    created() {
        // console.log(this.table_data)
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
</style>