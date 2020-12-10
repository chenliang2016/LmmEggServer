// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  infoList:[],
  infoPage:1,
  infoSize:10,
  infoTotal:0,
  infoById:{},
  infoModalType:"create",
  infoModalVisible:false,
  currentInfo:{},
  getInfoListPending: false,
  getInfoListError: null,
  submitInfoPending: false,
  submitInfoError: null,
  deleteInfoPending: false,
  deleteInfoError: null,
  infoCategoryList:[],
  infoCategoryPage:1,
  infoCategorySize:10,
  infoCategoryTotal:0,
  infoCategoryById:{},
  infoCategoryModalType:"create",
  infoCategoryModalVisible:false,
  currentInfoCategory:{},
  getInfoCategoryListPending: false,
  getInfoCategoryListError: null,
  submitInfoCategoryPending: false,
  submitInfoCategoryError: null,
  deleteInfoCategoryPending: false,
  deleteInfoCategoryError: null,
  getAllCategoryPending: false,
  getAllCategoryError: null,
  allinfoCategoryList:[],
  allinfoCategoryById:{},
  getQiniuTokenPending: false,
  getQiniuTokenError: null,
  qntoken:"",
  infoDetailList:[],
  infoDetailPage:1,
  infoDetailSize:10,
  infoDetailTotal:0,
  infoDetailById:{},
  infoDetailModalType:"create",
  infoDetailModalVisible:false,
  currentInfoDetail:{},
  getInfoDetailListPending: false,
  getInfoDetailListError: null,
  submitInfoDetailPending: false,
  submitInfoDetailError: null,
  deleteInfoDetailPending: false,
  deleteInfoDetailError: null,
  gotoAddOrEditPending: false,
  gotoAddOrEditError: null,
};

export default initialState;