exports.$Enums = {};
exports.ProjectStage = exports.$Enums.ProjectStage = {
  WaitingBountyMgrQuote: 'WaitingBountyMgrQuote',
  WaitingFounderPay: 'WaitingFounderPay',
  WaitingBountyDesign: 'WaitingBountyDesign',
  Declined: 'Declined',
  Ready: 'Ready',
};

exports.BountyType = exports.$Enums.BountyType = {
  Frontend: 'Frontend',
  Backend: 'Backend',
  Fullstack: 'Fullstack',
  Web3: 'Web3',
};

exports.BountyStage = exports.$Enums.BountyStage = {
  Active: 'Active',
  Draft: 'Draft',
  Completed: 'Completed',
  ReadyForTests: 'ReadyForTests',
};

exports.RoleType = exports.$Enums.RoleType = {
  Founder: 'Founder',
  BountyHunter: 'BountyHunter',
  BountyManager: 'BountyManager',
  BountyDesigner: 'BountyDesigner',
  BountyValidator: 'BountyValidator',
};
