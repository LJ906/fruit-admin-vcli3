<template>
  <div class="page travel-detail">
    <!-- <SectionTitle title="出差申请单" borderColor="#409eff"></SectionTitle> -->
    <div class="travel-detail-content">
      <h1 class="travel-detail-title">Business Travel Application Form</h1>
      <el-form
        ref="travelForm"
        class="p-b-50"
        :rules="travelFormRule"
        :model="form"
        label-position="right"
        label-width="200px"
        label-suffix=":"
      >
        <div>Item with <span style="color: red">*</span> is optional</div>
        <div class="line"></div>
        <h3><i class="el-icon-user-solid"></i>Basic Information</h3>

        <el-row class="p-r-50 m-t-30">
          <el-col :span="12">
            <el-form-item>
              <div slot="label" style="line-height: 18px">
                <span>Print Name:</span>
                <br />
                <span style="font-weight: 400">(Last Name, First Name)</span>
              </div>
              <el-input v-model.trim="form.printName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Department">
              <el-input v-model.trim="form.department" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Employee Number">
              <el-input v-model.trim="form.employeeNumber" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Cost Center">
              <el-input v-model.trim="form.costCenter" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Invoice Number" prop="invoiceNumber">
              <el-input v-model.trim="form.invoiceNumber" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Project Number" prop="projectNumber">
              <el-input v-model.trim="form.projectNumber" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Type of Business Trip" prop="businessType">
              <el-radio-group v-model="form.businessType">
                <el-radio label="1">Domestic Trip</el-radio>
                <el-radio label="2"
                  >International Trip (including Hong Kong, Macao and
                  Taiwan)</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Visit Countries/Cities">
              <el-input v-model.trim="form.visitCities" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Duration">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="form.departureDate"
                  style="width: 100%"
                  placeholder="Departure Date"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" align="center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  placeholder="Return Date"
                  v-model="form.returnDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Travel Purpose" prop="travelPurpose">
              <el-input v-model.trim="form.travelPurpose" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Private Time">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="form.privateStartDate"
                  style="width: 100%"
                  placeholder="Start Date"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" align="center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  placeholder="End Date"
                  v-model="form.privateEndDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Private Days in Total">
              <span>{{ form.privateDaysTotal }} Days</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="projectNumber" label-width="50px">
              <el-checkbox v-model="form.privateDayExceed50">
                Exceed 50% of the business-related time
              </el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-collapse v-model="activeNames">
          <!-- <el-collapse-item name="1">
            <template slot="title">
              <span class="travel-detail-option">Basic Information</span>
            </template>
          </el-collapse-item> -->
          <el-collapse-item name="2">
            <template slot="title">
              <span class="travel-detail-option">
                Flight / Train Information
              </span>
            </template>
            <el-row class="m-t-30 m-b-10 operation">
              <el-col :span="12">
                <label>Passenger Name: </label>
                <span class="passengerName">{{ user.name }}</span>
              </el-col>
              <el-col :span="12" align="right">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addItem('flight')"
                  >增加</el-button
                >
              </el-col>
            </el-row>
            <el-table :data="form.flightInfo" border class="m-b-30">
              <el-table-column prop="from" label="From">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.from" size="mini" />
                </template>
              </el-table-column>
              <el-table-column prop="to" label="To">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.to" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                prop="departureDate"
                label="Departure Date"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    style="width: 100%"
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="scope.row.departureDate"
                    size="mini"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="flightTrainNo"
                label="Flight/Train No."
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model.number="scope.row.flightTrainNo"
                    size="mini"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="flightPrice"
                label="Class & Price"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model.number="scope.row.flightPrice"
                    size="mini"
                  />
                </template>
              </el-table-column>
              <el-table-column label=" " width="50" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.$index > 0"
                    type="warning"
                    icon="el-icon-close"
                    circle
                    @click="deleteItem('flight', scope.$index)"
                    size="mini"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span class="travel-detail-option">
                Car Rental Information (mandatory)
              </span>
            </template>
            <el-row class="m-t-30 m-b-10 operation">
              <el-col :span="12">
                <label>Passenger Name: </label>
                <span class="passengerName">{{ user.name }}</span>
              </el-col>
              <el-col :span="12" align="right">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addItem('car')"
                  >增加</el-button
                >
              </el-col>
            </el-row>
            <el-table :data="form.carInfo" border class="m-b-30">
              <el-table-column prop="from" label="From">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.from" size="mini" />
                </template>
              </el-table-column>
              <el-table-column prop="to" label="To">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.to" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                prop="rentalStartTime"
                label="Rental Start Time"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="scope.row.rentalStartTime"
                    size="mini"
                    style="width: 100%"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="rentalEndTime"
                label="Rental End Time"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    type="date"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    v-model="scope.row.rentalEndTime"
                    size="mini"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="priceAndtype"
                label="Overall Price& / Car Type"
                :render-header="renderHeader"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model.number="scope.row.priceAndtype"
                    size="mini"
                  />
                </template>
              </el-table-column>
              <el-table-column label=" " width="50">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.$index > 0"
                    type="warning"
                    icon="el-icon-close"
                    circle
                    @click="deleteItem('car', scope.row.$index)"
                    size="mini"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <span class="travel-detail-option"> Hotel Information </span>
            </template>
            <el-row class="m-t-30 m-b-10 operation">
              <el-col :span="24" align="right">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addItem('hotel')"
                >
                  增加
                </el-button>
              </el-col>
            </el-row>

            <el-table :data="form.hotelInfo" border>
              <el-table-column prop="city" label="City" width="150">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.city" size="mini" />
                </template>
              </el-table-column>
              <el-table-column prop="hotelName" label="Hotel Name" width="150">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.hotelName" size="mini" />
                </template>
              </el-table-column>
              <el-table-column
                prop="checkInDate"
                label="Check-in Date"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="scope.row.checkInDate"
                    size="mini"
                    style="width: 100%"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="checkOutDate"
                label="Check-out Date"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="scope.row.checkOutDate"
                    size="mini"
                    style="width: 100%"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="roomPrice"
                label="Room Rate per Person"
                :render-header="renderHeader"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.roomPrice" size="mini" />
                </template>
              </el-table-column>
              <el-table-column label=" " width="50">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.$index > 0"
                    type="warning"
                    icon="el-icon-close"
                    circle
                    @click="deleteItem('car', scope.row.$index)"
                    size="mini"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template slot="title">
              <span class="travel-detail-option">
                Other Info Needs to be Stated
              </span>
            </template>

            <el-input
              type="textarea"
              v-model.trim="form.otherNeeds"
              clearable
              :rows="4"
            />
          </el-collapse-item>
        </el-collapse>
        <!-- 签名 -->
        <h3 class="m-t-40">Approved By</h3>
        <el-form-item label="Approved by">
          <el-select
            v-model="form.regionManager"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in salesmanList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="*Project Leader(if applicable)">
          <div slot="label" style="line-height: 18px">
            <span>*Project Leader:</span>
            <br />
            <span style="font-weight: 400">(if applicable)</span>
          </div>
          <el-select
            v-model="form.projectLeader"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in salesmanList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div slot="label" style="line-height: 18px">
            <span>General Manager/Chairman of the Board of Directors:</span>
            <br />
            <span style="font-weight: 400"
              >(mandatory for international trip and/or time off exceeds 50% of
              business time)</span
            >
          </div>
          <el-select
            v-model="form.chairman"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in salesmanList"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- <img src="" alt=""> -->
    <el-row class="m-t-30">
      <el-col :span="24" align="center">
        <el-button type="primary" size="mini" @click="handleSaveDraft"
          >保存</el-button
        >
        <el-button type="primary" @click="handleShowPreview" size="mini"
          >预览/提交</el-button
        >
      </el-col>
    </el-row>

    <!-- 预览弹框 -->

    <el-dialog title="预览" :visible.sync="previewDialog" width="1100px">
      <div id="previewDom" class="pdfwrp border-wrp" :v-loading="downLoading">
        <Preview :form="form"></Preview>
      </div>
      <!-- <img class="doc-img" :src="imgBase64" alt="" /> -->
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="previewDialog = false">取消</el-button>
        <el-button type="primary" @click="handleDownloadoad">下载PDF</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import SectionTitle from '@/components/SectionTitle'
import Preview from './preview'

// import { listSalesman } from '@/api/dealer.js'
export default {
  components: {
    // SectionTitle,
    Preview
  },
  data() {
    return {
      user: {
        name: 'LIJIN'
      },
      activeNames: ['1', '2', '3', '4', '5'],
      form: {
        printName: '323',
        department: 'Procurement & General Administration',
        employeeNumber: '41234134fasd',
        costCenter: 'Procurement & General Administration---211500',
        invoiceNumber: '23412341234413',
        projectNumber: '100022 - Top employer survey',
        businessType: '1', // 固定
        visitCities: '中年各国',
        departureDate: '2021-06-01',
        returnDate: '2021-06-01',
        travelPurpose: '3',
        privateStartDate: '2021-06-01',
        privateEndDate: '2021-06-01',
        privateDaysTotal: 10,
        privateDayExceed50: true,

        flightInfo: [
          {
            passengerName: 'lijin',
            from: '北京',
            to: '重庆',
            departureDate: '',
            flightTrainNo: '',
            flightPrice: ''
          }
        ],
        carInfo: [
          {
            passengerName: 'lijin',
            from: '北京',
            to: '重庆',
            rentalStartTime: '',
            rentalEndTime: '',
            flightTrainNo: '',
            priceAndtype: ''
          }
        ],
        hotelInfo: [
          {
            city: '北京',
            hotelName: '重庆',
            checkInDate: '',
            checkOutDate: '',
            roomPrice: ''
          }
        ],
        regionManager: '',
        projectLeader: '',
        chairman: ''
      },
      travelFormRule: {
        invoiceNumber: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      salesmanList: [],
      downLoading: false,
      previewDialog: false,
      imgBase64: ''
    }
  },
  created() {
  },
  methods: {
    renderHeader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('/')[0]),
        h('br'),
        h('span', {}, column.label.split('/')[1])
      ])
    },
    addItem(flag) {
      if (flag === 'flight') {
        this.form.flightInfo.push({
          passengerName: 'lijin',
          from: '',
          to: '',
          departureDate: '',
          flightTrainNo: '',
          flightPrice: ''
        })
      } else if (flag === 'car') {
        this.form.carInfo.push({
          passengerName: '',
          from: '',
          to: '',
          rentalStartTime: '',
          rentalEndTime: '',
          flightTrainNo: '',
          priceAndtype: ''
        })
      } else {
        this.form.hotelInfo.push({
          city: '',
          hotelName: '',
          checkInDate: '',
          checkOutDate: '',
          roomPrice: ''
        })
      }
    },
    deleteItem(flag, i) {
      console.log('deleteItem', i)
      if (flag === 'flight') {
        this.form.flightInfo.splice(i, 1)
      } else if (flag === 'car') {
        this.form.carInfo.splice(i, 1)
      }
    },
    handleSaveDraft() {

    },
    async handleShowPreview() {
      this.previewDialog = true
    },
    async handleDownloadoad() {
      this.downLoading = true
      await this.html2PDF('previewDom', 'Business Travel Application Preview')
      this.downLoading = false
    },
    async handleSubmit() {
      let imgBase64 = await this.html2PDF('previewDom', 'Business Travel Application Preview')
      // this.imgBase64 = imgBase64
      let fileData = this.dataURLtoFile(imgBase64, '名字')
      let fd = new FormData()
      // console.log('file', fileTemp)
      // let fileOfBlob = new File([fileTemp], new Date() + '.jpg') // 重命名了
      // fd.append('file', fileOfBlob)
      fd.append('file', fileData)
      console.log('fd', fd)
    },
    // base64转文件格式blob
    dataURLtoFile(dataURI, filename) {
      let arr = dataURI.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let binary = atob(arr[1])
      let array = []
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], filename, { type: mime })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.travel-detail-title {
  text-align: center;
  margin-bottom: 30px;
}
.travel-detail-option {
  font-size: 16px;
  font-weight: 700;
}

.travel-detail {
  padding-bottom: 80px;
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
}
</style>