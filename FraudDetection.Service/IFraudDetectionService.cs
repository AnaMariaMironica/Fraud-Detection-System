﻿using FraudDetection.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Service
{
    public interface IFraudDetectionService
    {
        List<TransactionDTO> GetAlerts();
        TransactionDTO GetAlert(int id);
        bool SaveTransactionStatus(int transactionId, int statusCode);
        TransactionAlertReponse VerifyAlert(TransactionDTO transaction);
        bool InsertTransactionList(List<TransactionDTO> lstTransactions);
        bool InsertTransation(TransactionDTO transaction);
        DailyStatisticsDTO GetDailyStatistics();
        MonthStatisticDTO GetDashboardStatisticsPerCurrentMonth();
    }
}
