const documentTypeData = {
  ASNType: {
    documentType: 'Gt-AdvanceShipNotice',
    version: '310',
    events: {
      onAfterSave: ['FreightForwarder', 'Customer'],
      onDelete: ['FreightForwarder', 'Customer'],
      onCreate: ['FreightForwarder', 'Customer'],
      onSave: ['FreightForwarder', 'Customer'],
    },
  },
  BillOfLadingInstruction: {
    documentType: 'BillOfLadingInstruction',
    version: '310',
    events: {
      onChange: ['FreightForwarder', 'Customer'],
      onSave: ['FreightForwarder', 'Customer'],
      onSubmit: ['FreightForwarder', 'Customer'],
      onCreate: ['FreightForwarder', 'Customer'],
    },
  },
  CarrierBookingRequest: {
    documentType: 'CarrierBookingRequest',
    version: '310',
    events: {
      onCancel: ['FreightForwarder', 'Customer'],
      onChange: ['FreightForwarder', 'Customer'],
      onSave: ['FreightForwarder', 'Customer'],
      onSubmit: ['FreightForwarder', 'Customer'],
      onCreate: ['FreightForwarder', 'Customer'],
    },
  },
  CarrierBookingResponse: {
    documentType: 'CarrierBookingRequest',
    version: '310',
    events: {
      onAccept: ['FreightForwarder', 'Customer'],
      onReject: ['FreightForwarder', 'Customer'],
    },
  },
  FirstSaleCostWorksheetDetail: {
    documentType: 'FirstSaleCostWorksheetDetail',
    version: '310',
    events: {
      onActive: ['Seller', 'BuyerCompliance'],
      onClose: ['Seller', 'BuyerCompliance'],
      onSave: ['Seller', 'BuyerCompliance'],
      onValidate: ['Seller', 'BuyerCompliance'],
    },
  },
  GoodsDispatchDetail: {
    documentType: 'GoodsDispatchDetail',
    version: '310',
    events: {
      cancelValidate: ['Buyer', 'Seller', 'OriginOfGoods'],
      onActivate: ['Buyer', 'Seller', 'OriginOfGoods'],
      onValidate: ['Buyer', 'Seller', 'OriginOfGoods'],
      onCancel: ['Buyer', 'Seller', 'OriginOfGoods'],
      onSave: ['Buyer', 'Seller', 'OriginOfGoods'],
      reopenValidate: ['Buyer', 'Seller', 'OriginOfGoods'],
    },
  },
  InventoryAdvice: {
    documentType: 'InventoryAdvice',
    version: '310',
    events: {
      businessProcessDefault: ['Buyer', 'Customer'],
      onProjection: ['Buyer', 'Customer'],
    },
  },
  InvoiceDetail: {
    documentType: 'InvoiceDetail',
    version: '310',
    events: {
      onActivate: ['Buyer', 'Seller'],
      onValidate: ['Buyer', 'Seller'],
      onCancel: ['Buyer', 'Seller'],
      onSave: ['Buyer', 'Seller'],
    },
  },
  Issue: {
    documentType: 'Issue',
    version: '311',
    events: {
      onSave: ['Customer'],
      preconditionUnconfirmedConfirm: ['Customer'],
      validateClose: ['Customer'],
      validateReopen: ['Customer'],
      validateResolve: ['Customer'],
      validateSubmit: ['Customer'],
      validateTransfer: ['Customer'],
    },
  },
  LoadPlan: {
    documentType: 'LoadPlan',
    version: '310',
    events: { onValidate: ['FreightForwarder', 'Customer'] },
  },
  OrderDetail: {
    documentType: 'OrderDetail',
    version: '310',
    events: {
      onActivate: ['Buyer', 'Seller'],
      onCancel: ['Buyer', 'Seller'],
      onClose: ['Buyer', 'Seller'],
      onSave: ['Buyer', 'Seller'],
      onValidate: ['Buyer', 'Seller'],
      preconditionUnconfirmedConfirm: ['Buyer', 'Seller'],
    },
  },
  PackingListDetail: {
    documentType: 'PackingListDetail',
    version: '310',
    events: {
      cancelValidate: ['Buyer', 'Seller'],
      onActivate: ['Buyer', 'Seller'],
      onCancel: ['Buyer', 'Seller'],
      onClose: ['Buyer', 'Seller'],
      onSave: ['Buyer', 'Seller'],
      onValidate: ['Buyer', 'Seller'],
      reopenValidate: ['Buyer', 'Seller'],
    },
  },
  PackingPlanDetail: {
    documentType: 'PackingPlanDetail',
    version: '310',
    events: {
      cancelValidate: ['Buyer', 'Seller'],
      onActivate: ['Buyer', 'Seller'],
      onCancel: ['Buyer', 'Seller'],
      onClose: ['Buyer', 'Seller'],
      onSave: ['Buyer', 'Seller'],
      onValidate: ['Buyer', 'Seller'],
      reopenValidate: ['Buyer', 'Seller'],
    },
  },
  PaymentAuthorizationDetail: {
    documentType: 'PaymentAuthorizationDetail',
    version: '310',
    events: {
      onActivate: ['Buyer', 'Seller'],
      onSave: ['Buyer', 'Seller'],
      onValidate: ['Buyer', 'Seller'],
    },
  },
  PackageBookingDetail: {
    documentType: 'PackageBookingDetail',
    version: '310',
    events: {
      onActivate: ['Buyer', 'Seller'],
      onBuyerException: ['Buyer', 'Seller'],
      onCancel: ['Buyer', 'Seller'],
      onCreateNew: ['Buyer', 'Seller'],
      onReload: ['Buyer', 'Seller'],
      onReopen: ['Buyer', 'Seller'],
      onSave: ['Buyer', 'Seller'],
      onValidate: ['Buyer', 'Seller'],
    },
  },
  PackageBookingStatusDetail: {
    documentType: 'PackageBookingStatusDetail',
    version: '310',
    events: {
      onAccept: ['Buyer', 'Seller', 'LogisticsProvider'],
      onCreateNew: ['Buyer', 'Seller', 'LogisticsProvider'],
      onReject: ['Buyer', 'Seller', 'LogisticsProvider'],
      onSave: ['Buyer', 'Seller', 'LogisticsProvider'],
      onValidate: ['Buyer', 'Seller', 'LogisticsProvider'],
    },
  },
  ProductCatalogDetail: {
    documentType: 'ProductCatalogDetail',
    version: '310',
    events: { onSave: ['Owner'], onCreate: ['Owner'] },
  },
  ReadyToShipOrder: {
    documentType: 'ReadyToShipOrder',
    version: '310',
    events: {
      onApprove: ['Consolidator', 'Shipper'],
      onCreate: ['Consolidator', 'Shipper'],
      onDecline: ['Consolidator', 'Shipper'],
      onReopen: ['Consolidator', 'Shipper'],
      onSave: ['Consolidator', 'Shipper'],
      onSubmit: ['Consolidator', 'Shipper'],
      onValidate: ['Consolidator', 'Shipper'],
    },
  },
  ShipmentPlanType: {
    documentType: 'ShipmentPlanType',
    version: '310',
    events: {
      onSave: ['FreightForwarder', 'Customer'],
      onCreate: ['FreightForwarder', 'Customer'],
    },
  },
  ShippingOrder: {
    documentType: 'ShippingOrder',
    version: '310',
    events: {
      onInitialize: ['Customer', 'Supplier', 'Consolidator'],
      onPreCreate: ['Customer', 'Supplier', 'Consolidator'],
      onSave: ['Customer', 'Supplier', 'Consolidator'],
      onSavePending: ['Customer', 'Supplier', 'Consolidator'],
      onSubmit: ['Customer', 'Supplier', 'Consolidator'],
      onValidate: ['Customer', 'Supplier', 'Consolidator'],
      onValidatePending: ['Customer', 'Supplier', 'Consolidator'],
      onCreate: ['Customer', 'Supplier', 'Consolidator'],
    },
  },
  SupplyChainFlow: {
    documentType: 'SupplyChainFlow',
    version: '310',
    events: { onActivity: ['Owner'] },
  },
  TransportNoteDetail: {
    documentType: 'TransportNoteDetail',
    version: '310',
    events: {
      cancelValidate: ['Owner'],
      onActivate: ['Owner'],
      onCancel: ['Owner'],
    },
  },
  TransportOrderShipment: {
    documentType: 'TransportOrderShipment',
    version: '310',
    events: {
      onSave: ['Customer', 'Consolidator'],
      onCreate: ['Customer', 'Consolidator'],
    },
  },
  TransportPlan: {
    documentType: 'TransportPlan',
    version: '310',
    events: {
      onSave: ['Customer', 'Consolidator'],
      onCreate: ['Customer', 'Consolidator'],
    },
  },
  TransportShipment: {
    documentType: 'TransportShipment',
    version: '311',
    events: {
      onSave: ['FreightForwarder', 'Buyer'],
      onCreate: ['FreightForwarder', 'Buyer'],
    },
  },
  ReceiptType: {
    documentType: 'ReceiptType',
    version: '310',
    events: {
      onSave: ['Consolidator', 'Customer'],
      onCreate: ['Consolidator', 'Customer'],
    },
  },
};

function flattenDocuments(dataSet) {
  const returnValue = [];
  Object.keys(dataSet).forEach((docKey) => {
    returnValue.push({
      title: docKey,
      version: dataSet[docKey].version,
    });
  });
  return returnValue;
}

function flattenEvents(dataSet) {
  const returnValue = [];

  Object.values(dataSet).forEach((document) => {
    Object.keys(document.events).forEach((event) => {
      if (returnValue.indexOf(event) < 0) {
        returnValue.push(event);
      }
    });
  });

  return returnValue.map((event) => {
    return { title: event };
  });
}

function flattenRoles(dataSet) {
  const returnValue = ['Buyer', 'Seller'];

  Object.values(dataSet).forEach((document) => {
    Object.values(document.events).forEach((events) => {
      events.forEach((event) => {
        if (returnValue.indexOf(event) < 0) {
          returnValue.push(event);
        }
      });
    });
  });

  return returnValue.map((event) => {
    return { title: event };
  });
}

console.log(flattenRoles(documentTypeData));