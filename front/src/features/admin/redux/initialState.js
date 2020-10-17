const initialState = {
  adminList:[],
  adminPage:1,
  adminSize:10,
  adminTotal:0,
  adminById:{},
  adminModalType:"create",
  adminModalVisible:false,
  currentAdmin:{},
  getAdminListPending: false,
  getAdminListError: null,
  submitAdminPending: false,
  submitAdminError: null,
  deleteAdminPending: false,
  deleteAdminError: null,
};

export default initialState;
