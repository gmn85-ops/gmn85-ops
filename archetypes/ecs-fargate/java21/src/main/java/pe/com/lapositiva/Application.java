package pe.com.lapositiva;

import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class Application {
    public static void main(String[] args) { SpringApplication.run(Application.class, args); }
}

@RestController
@RequestMapping("/customers")
class CustomerController {
    private final MongoTemplate mongo;
    CustomerController(MongoTemplate mongo) { this.mongo = mongo; }

    @GetMapping("/{id}")
    Object get(@PathVariable String id) {
        var query = new org.springframework.data.mongodb.core.query.Query(
                org.springframework.data.mongodb.core.query.Criteria.where("businessId").is(id));
        query.maxTime(java.time.Duration.ofMillis(Long.parseLong(System.getenv().getOrDefault("MONGODB_MAX_TIME_MS", "3000"))));
        Document result = mongo.findOne(query, Document.class, System.getenv("MONGODB_COLLECTION"));
        if (result == null) throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND);
        return java.util.Map.of("data", result);
    }
}
