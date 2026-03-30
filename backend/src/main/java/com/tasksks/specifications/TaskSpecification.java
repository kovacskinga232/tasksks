package com.tasksks.specifications;

import com.tasksks.models.Task;
import com.tasksks.models.enums.Priority;
import com.tasksks.models.enums.Tag;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class TaskSpecification {
    public static Specification<Task> filterTasks(
            Long userId,
            String title,
            Priority priority,
            Tag tag,
            Boolean completed
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(criteriaBuilder.equal(root.get("user").get("id"), userId));

            if (title != null && !title.isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase(Locale.ROOT) + "%"
                ));
            }

            if (priority != null) {
                predicates.add(criteriaBuilder.equal(root.get("priority"), priority));
            }
            if (tag != null) {
                predicates.add(criteriaBuilder.equal(root.get("tag"), tag));
            }
            if (completed != null) {
                predicates.add(criteriaBuilder.equal(root.get("completed"), completed));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
