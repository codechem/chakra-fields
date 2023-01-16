export enum FormKey {
  FULL_NAME = 'fullName',
  USERNAME = 'username',
  AGE = 'age',
  DOB = 'dob',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  DISABLE_FIELD = 'disableField',
  YEAR_STUDIES = 'yearStudies',
  TUITION_AMOUNT = 'tuitionAmount',
  COMMENTS = 'comments',
  TERMS = 'terms',
  LANGUAGES = 'languages'
};

export type Values = {
  [FormKey.FULL_NAME]: string;
  [FormKey.USERNAME]: string;
  [FormKey.AGE]: string;
  [FormKey.DOB]: string;
  [FormKey.PASSWORD]: string;
  [FormKey.CONFIRM_PASSWORD]: string;
  [FormKey.DISABLE_FIELD]: string;
  [FormKey.YEAR_STUDIES]: string;
  [FormKey.TUITION_AMOUNT]: string;
  [FormKey.COMMENTS]: string;
  [FormKey.TERMS]: string;
  [FormKey.LANGUAGES]: number[];
};