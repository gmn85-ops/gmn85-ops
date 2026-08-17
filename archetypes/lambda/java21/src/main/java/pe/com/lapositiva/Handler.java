package pe.com.lapositiva;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.Map;

public class Handler implements RequestHandler<Map<String, Object>, Map<String, Object>> {
    private static final MongoClient CLIENT = MongoClients.create(System.getenv("MONGODB_URI"));

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> event, Context context) {
        @SuppressWarnings("unchecked")
        Map<String, String> path = (Map<String, String>) event.getOrDefault("pathParameters", Map.of());
        String id = path.get("id");
        if (id == null || id.isBlank()) {
            return Map.of("statusCode", 400, "body", "{\"code\":\"INVALID_REQUEST\"}");
        }

        MongoCollection<Document> collection = CLIENT
                .getDatabase(System.getenv("MONGODB_DATABASE"))
                .getCollection(System.getenv("MONGODB_COLLECTION"));

        Document result = collection.find(new Document("businessId", id)).first();
        return Map.of(
                "statusCode", result == null ? 404 : 200,
                "body", result == null ? "{\"data\":null}" : "{\"data\":" + result.toJson() + "}"
        );
    }
}
