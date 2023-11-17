<template>
    <section>
        <TheTableHeader class="the-table-header" :headers="listOfHeader" />
        <TheTableRow class="the-table-row" v-for="(row, index) in listOfRows" :key="index" :row="row" />
    </section>
</template>

<script>
import TheTableHeader from './TheTableHeader.vue';
import TheTableRow from './TheTableRow.vue';
export default {

    components: {
        TheTableHeader,
        TheTableRow
    },
    data() {
        return {
            listOfHeader: ['Name', 'Supplier', 'Task', '1st Email', 'Reminder', 'Deadline', 'Reports', 'Notes', 'Status'],
            listOfRows: [
                ['Cleaning', 'ABC Cleaning Services', 'Office Cleaning', '2023-11-01', '2023-11-06', '2023-11-20', ['cleaning_report_1.pdf', 'cleaning_report_2.pdf'], 'Completed successfully', 'Done'],
                ['Alarm Check', 'Secure Systems', 'Security System Check', '2023-11-03', '2023-11-08', '2023-11-23', ['alarm_check_report.pdf'], 'System functioning properly', 'Done'],
                ['Water Pressure System Check', 'AquaTech Solutions', 'System Maintenance', '2023-11-05', '2023-11-10', '2023-11-25', ['pressure_system_report.pdf'], 'Adjusted pressure levels', 'Done'],
                ['HVAC Maintenance', 'Climate Control Services', 'HVAC System Check', '2023-11-07', '2023-11-12', '2023-11-27', ['hvac_maintenance_report.pdf'], 'Replaced air filters', 'Done'],
                ['Fire Extinguisher Inspection', 'SafeFire Inspections', 'Safety Inspection', '2023-11-09', '2023-11-14', '2023-11-29', ['fire_inspection_report.pdf'], 'All extinguishers in good condition', 'Done'],
                ['IT System Update', 'Tech Solutions Inc.', 'System Upgrade', '2023-11-11', '2023-11-16', '2023-11-30', ['it_system_update_report.pdf'], 'Completed without disruptions', 'Done'],
                ['Pest Control', 'BugBusters', 'Pest Inspection', '2023-11-13', '2023-11-18', '2023-12-03', ['pest_control_report.pdf'], 'No signs of pests found', 'Done'],
                ['Electrical Safety Check', 'PowerPro Services', 'Electrical Inspection', '2023-11-15', '2023-11-20', '2023-12-05', ['electrical_safety_report.pdf'], 'Fixed faulty wiring', 'Done'],
                ['Landscaping', 'GreenThumb Landscapes', 'Outdoor Maintenance', '2023-11-17', '2023-11-22', '2023-12-07', ['landscaping_report_1.pdf', 'landscaping_report_2.pdf'], 'Trimmed hedges and mowed lawn', 'Done'],
                ['Inventory Audit', 'StockMaster Inc.', 'Stock Check', '2023-11-19', '2023-11-24', '2023-12-09', ['inventory_audit_report.pdf'], 'No discrepancies found', 'Done'],
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
// tr {
//     display: flex;
//     justify-content: space-around;
//     align-items: center;

//     .the-table-header,
//     .the-table-row {
//         width: calc(100%/3);
//         overflow: hidden;
//         text-align: center;
//     }

//     .the-table-header {
//         height: 4rem;
//         font-size: 2rem;
//     }

//     .the-table-row {
//         height: 3rem;
//         font-size: 1.3rem;
//     }
// }
</style>


<!-- 
+--------------------+--------------------------------+------+-----+---------+----------------+
| Field              | Type                           | Null | Key | Default | Extra          |
+--------------------+--------------------------------+------+-----+---------+----------------+
| id                 | int(11)                        | NO   | PRI | NULL    | auto_increment |
| name               | varchar(255)                   | NO   |     | NULL    |                |
| date_created       | datetime                       | NO   |     | NULL    |                |
| object             | varchar(255)                   | NO   |     | NULL    |                |
| supplier           | varchar(255)                   | NO   |     | NULL    |                |
| task_group         | int(11)                        | NO   |     | NULL    |                |
| task_name          | int(11)                        | NO   |     | NULL    |                |
| status             | enum('done','pending','delay') | NO   |     | done    |                |
| notes              | text                           | YES  |     | NULL    |                |
| send_date          | datetime                       | NO   |     | NULL    |                |
| send_reminder_date | datetime                       | YES  |     | NULL    |                |
| reminder_frequency | varchar(255)                   | NO   |     | NULL    |                |
| weather            | varchar(255)                   | NO   |     | NULL    |                |
| deadline           | datetime                       | NO   |     | NULL    |                |
| manager            | varchar(255)                   | NO   |     | NULL    |                |
| report             | text                           | NO   |     | NULL    |                |
| created_by         | varchar(255)                   | NO   |     | NULL    |                |
+--------------------+--------------------------------+------+-----+---------+----------------+

['name','supplier','task','1st_email','reminder','deadline','reports','notes','status']

 -->