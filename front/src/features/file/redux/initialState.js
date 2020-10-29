const initialState = {
  afileList:[],
  afilePage:1,
  afileSize:10,
  afileTotal:0,
  afileById:{},
  afileModalType:"create",
  afileModalVisible:false,
  currentAfile:{},
  getAfileListPending: false,
  getAfileListError: null,
  submitAfilePending: false,
  submitAfileError: null,
  deleteAfilePending: false,
  deleteAfileError: null,
};

export default initialState;
