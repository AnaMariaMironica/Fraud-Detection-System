﻿using MongoDB.Bson.Serialization.Attributes;

namespace FraudDetection.Models
{
    [BsonIgnoreExtraElements]
    public class CardTypeDTO : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
    }
}
