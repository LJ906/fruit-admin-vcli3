<template>
  <div class="page apply-preview">
    <div class="preview-paper">
      <h1 class="travel-detail-title" style="margin-bottom: 6px;">VOLKSWANGEN FINANCIAL SERVICES</h1>
      <div class="travel-detail-title">THE KEY TO MOBILITY</div>
      <h2 class="travel-detail-title m-t-50">
        Business Travel Application Form
      </h2>
      <div class="m-b-4">
        Item with <span style="color: red">*</span> is optional
      </div>
      <div class="base-info">
        <div class="pre-row">
          <div class="pre-column flex2">
            <div style="line-height: 16px">
              <span class="passenger-name">Print Name:</span>
              <br />
              <span style="font-size: 10px">Last Name, First Name</span>
            </div>
          </div>
          <div class="pre-column flex3">{{ form.printName }}</div>
          <div class="pre-column flex2">Department:</div>
          <div class="pre-column flex3">
            <div class="column-wrap">{{ form.department }}</div>
          </div>
        </div>
        <div class="pre-row">
          <div class="pre-column flex2">Employee Number:</div>
          <div class="pre-column flex3">{{ form.employeeNumber }}</div>
          <div class="pre-column flex2">Cost Center</div>
          <div class="pre-column flex3">
            <div class="column-wrap">{{ form.costCenter }}</div>
          </div>
        </div>
        <div class="pre-row">
          <div class="pre-column flex2">
            <span style="color: red">*</span>Invoice Number:
          </div>
          <div class="pre-column flex3">{{ form.invoiceNumber }}</div>
          <div class="pre-column flex2">Project Number:</div>
          <div class="pre-column flex3">
            <div class="column-wrap">{{ form.projectNumber }}</div>
          </div>
        </div>
        <div class="pre-row">
          <div class="pre-column flex2W flex-align-center" style="height: 64px">
            <div style="line-height: 20px">
              <span class="passenger-name">Type of Business Trip:</span>
              <br />
              <span style="font-size: 10px">please tick</span>
            </div>
          </div>
          <div class="pre-column c1" style="height: 64px; padding: 0">
            <div class="border-b pre-column-child">
              <span
                class="check-wrp"
                :class="{ 'el-icon-check': form.businessType === '1' }"
              ></span>
              Domestic Trip
            </div>
            <div class="pre-column-child">
              <span
                class="check-wrp"
                :class="{ 'el-icon-check': form.businessType === '2' }"
              ></span>
              International Trip (including Hong Kong, Macao and Taiwan)
            </div>
          </div>
        </div>
        <div class="pre-row">
          <div class="pre-column flex2W flex-align-center">
            Visit Countries/Cities:
          </div>
          <div class="pre-column c1">{{ form.visitCities }}</div>
        </div>
        <div class="pre-row">
          <div class="pre-column flex2W flex-align-center" style="height: 64px">
            Duration:
          </div>
          <div class="pre-column c1" style="height: 64px; padding: 0">
            <div class="border-b pre-column-child">
              Departure Date: {{ form.departureDates }}
            </div>
            <div class="pre-column-child">
              Return Date : {{ form.returnDate }}
            </div>
          </div>
        </div>
        <div class="pre-row">
          <div class="pre-column flex2W flex-align-center">
            Visit Countries/Cities
          </div>
          <div class="pre-column c1">{{ form.visitCities }}</div>
        </div>
        <div class="pre-row">
          <div class="pre-column flex2W flex-align-center h64">
            Private Time:
          </div>
          <div class="pre-column-child c1 flex-align-center h64 p-0">
            <div class="pre-column c1 h64 p-0">
              <div class="border-b pre-column-child">
                Start Date: {{ form.privateStartDate }}
              </div>
              <div class="pre-column-child">
                Return Date : {{ form.privateEndDate }}
              </div>
            </div>
            <div class="pre-column c1 h64 p-0">
              <div class="border-b pre-column-child">
                Private Days in Total: {{ form.privateDaysTotal }} Days
              </div>
              <div class="pre-column-child">
                <span
                class="check-wrp"
                :class="{ 'el-icon-check': form.privateDayExceed50 }"
              ></span>
                Exceed 50% of the business-related time
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flight-info">
        <h3>Flight / Train Information</h3>
        <el-table
          :data="form.flightInfo"
          border
          class="m-b-30 apply-table"
          size="mini"
        >
          <el-table-column
            prop="passengerName"
            label="Passenger Name"
          ></el-table-column>
          <el-table-column prop="from" label="From"></el-table-column>
          <el-table-column prop="to" label="To"></el-table-column>
          <el-table-column
            prop="departureDate"
            label="Departure Date"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="flightTrainNo"
            label="Flight/Train No."
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="flightPrice"
            label="Class & Price"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flight-info">
        <h3>Car Rental Information (mandatory)</h3>
        <el-table
          :data="form.carInfo"
          border
          class="m-b-30 apply-table"
          size="mini"
        >
          <el-table-column
            prop="passengerName"
            label="Passenger Name"
          ></el-table-column>
          <el-table-column prop="from" label="From"></el-table-column>
          <el-table-column prop="to" label="To"></el-table-column>
          <el-table-column
            prop="rentalStartTime"
            label="Rental Start Time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="rentalEndTime"
            label="Rental End Time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="priceAndtype"
            label="Overall Price&Car Type"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>

      <div class="flight-info">
        <h3>Hotel Information</h3>
        <el-table
          :data="form.hotelInfo"
          border
          class="m-b-30 apply-table"
          size="mini"
        >
          <el-table-column prop="city" label="City"></el-table-column>
          <el-table-column
            prop="hotelName"
            label="Hotel Name"
          ></el-table-column>
          <el-table-column
            prop="checkInDate"
            label="Check-in Date"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="checkOutDate"
            label="Check-out Date"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="roomPrice"
            label="Room Rate per Person"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flight-info m-b-40">
        <h3>Other Info Needs to be Stated</h3>
        <el-input
          type="textarea"
          :row="3"
          readonly
          v-model="form.otherInfo"
        ></el-input>
      </div>

      <!-- 签名 -->
      <div class="flight-info m-b-40">
        <el-row>
          <el-col :span="6">
            <div class="signature">

            </div>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          printName: '412341',
          department: 'Procurement & General Administration',
          employeeNumber: '41234134fasd',
          costCenter: 'Procurement & General Administration---211500',
          invoiceNumber: '23412341234413',
          projectNumber: '100022 - Top employer survey',
          businessType: '1',
          visitCities: '北京天津',
          departureDate: '2021-05-28',
          returnDate: '2021-05-29',
          travelPurpose: 'xxxx',
          privateStartDate: '',
          privateEndDate: '',
          privateDaysTotal: 10,
          privateDayExceed50: true,

          flightInfo: [
            {
              passengerName: 'lijin',
              from: '北京',
              to: '重庆',
              departureDate: '2021-05-28',
              flightTrainNo: 'xxxx',
              flightPrice: '31231'
            },
            {
              passengerName: 'lijin',
              from: '北京',
              to: '重庆',
              departureDate: '2021-05-28',
              flightTrainNo: 'xxxx',
              flightPrice: '31231'
            }
          ],
          carInfo: [
            {
              passengerName: 'lijin',
              from: '北京',
              to: '重庆',
              rentalStartTime: '2021-05-28',
              rentalEndTime: '2021-05-28',
              flightTrainNo: '3131',
              priceAndtype: '1321'
            }
          ],
          hotelInfo: [
            {
              city: '北京',
              hotelName: '重庆',
              checkInDate: '2021-05-28',
              checkOutDate: '2021-05-28',
              roomPrice: '312'
            }
          ],
          otherInfo: '这是一个备注'
        }
      }
    }
  },
  data() {
    return {
      user: {
        name: 'LIJIN'
      },
      activeNames: ['1', '2', '3', '4', '5']
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
$previewBorderColor: #ccc;
.apply-preview {
  padding: 30px;
  .preview-paper {
    width: 950px;
    margin: 0 auto;
  }

  .travel-detail-title {
    text-align: center;
    letter-spacing: 1px;
  }

  .base-info {
    border-top: 1px solid $previewBorderColor;
    border-left: 1px solid $previewBorderColor;
  }
  .pre-row {
    display: flex;
    align-items: center;
    .h64 {
      height: 64px;
    }
    .p-0 {
      padding: 0;
    }
  }

  .pre-column,
  .pre-column-child {
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    font-size: 14px;
  }
  .pre-column {
    border-right: 1px solid $previewBorderColor;
    border-bottom: 1px solid $previewBorderColor;
  }

  .border-b {
    border-bottom: 1px solid $previewBorderColor;
  }
  .flex-align-center {
    display: flex;
    align-items: center;
  }
  .column-wrap {
    height: 34px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    line-height: 14px;
  }
  .c1 {
    flex: 1;
  }
  .flex2W {
    width: 194px;
  }
  .flex2 {
    flex: 2;
  }
  .flex3 {
    flex: 3;
  }
  .flex8 {
    flex: 8;
  }

  .passenger-name {
    font-weight: 600;
  }

  .line {
    border-bottom: 1px solid #e6ebf5;
  }
  .travel-detail-content {
    padding: 20px 40px;
    width: 980px;
    height: auto;
    margin: 0 auto;
    border: 1px solid #efefef;
  }
  .border-section {
    padding-top: 30px;
    margin-top: 10px;
    border: 1px solid #ebe9e9;
    border-radius: 10px;
  }
  .passengerName {
    font-size: 14px;
    font-weight: 600;
  }

  .check-wrp {
    display: inline-block;
    margin-right: 14px;
    width: 16px;
    height: 16px;
    border: 1px solid #ccc;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    font-weight: 600;
  }
  .signature {
    
  }
}

.table-cell-style {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  color: #222;
}
</style>
<style lang="scss">
.apply-table {
  &.el-table,
  &.el-table thead {
    color: #222;
  }
  &.el-table--group,
  &.el-table--border {
    border-color: #ccc;
  }

  &.el-table--border th,
  &.el-table--border td {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  &.el-table--group::after,
  &.el-table--border::after,
  &.el-table::before {
    background-color: #ccc;
  }
}
</style>