exports.$Enums = {};
exports.ProjectStage = exports.$Enums.ProjectStage = {
  PendingBountyMgrQuote: 'PendingBountyMgrQuote',
  PendingFounderPay: 'PendingFounderPay',
  PendingBountyDesign: 'PendingBountyDesign',
  PendingBountyValidator: 'PendingBountyValidator',
  PendingApproval: 'PendingApproval',
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
  PendingApproval: 'PendingApproval',
  Completed: 'Completed',
};

exports.RoleType = exports.$Enums.RoleType = {
  Founder: 'Founder',
  BountyHunter: 'BountyHunter',
  BountyManager: 'BountyManager',
  BountyDesigner: 'BountyDesigner',
  BountyValidator: 'BountyValidator',
};
