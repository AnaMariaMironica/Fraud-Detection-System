using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FraudDetection.Models;
using FraudDetection.Service;
using System.Linq;
using System.Web.Http;
<<<<<<< HEAD
using System.Threading.Tasks;
=======
using System;
>>>>>>> 452b2a4d5a9ba689a9fc85852535dee41af46ce2

namespace FraudDetection.Web.Controllers
{
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        private IFraudDetectionService _fraudService;
        public TransactionsController()
        {
            _fraudService = new FraudDetectionService();
        }

        [HttpPost("[action]")]
        public IEnumerable<TransactionDTO> GetAlerts([FromBody]TransactionListRequest query)
        {
            var lstTransactions = _fraudService.GetAlerts(query.TransactionDate);
            return lstTransactions;
        }

        [HttpPost("[action]")]
        public TransactionDTO GetAlert([FromBody] TransactionDTO transactionRequest)
        {
            var transaction = _fraudService.GetAlert(transactionRequest.TransactionId);
            return transaction;
        }

        [HttpPost("[action]")]
        public bool SaveTransactionStatus([FromBody] TransactionDTO transactionRequest)
        {
            var transactionChange = _fraudService.SaveTransactionStatus(transactionRequest.TransactionId, transactionRequest.Class);
            return transactionChange;
        }


        [HttpPost("[action]")]
        public TransactionAlertReponse VerifyAlert([FromBody]TransactionDTO transaction)
        {
            var response =   _fraudService.VerifyAlert(transaction);
            return response;
        }
        [HttpGet("[action]")]
        public DailyStatisticsDTO GetDailyStatistics()
        {
            var response = _fraudService.GetDailyStatistics();
            return response;
        }
        [HttpGet("[action]")]
        public MonthStatisticDTO GetDashboardStatisticsPerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerCurrentMonth();
            return response;
        }
    }

    public class TransactionListRequest
    {
        public DateTime TransactionDate { get; set; }
    }
}
