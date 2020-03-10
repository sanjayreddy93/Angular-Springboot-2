package org.example.AngularSpring.repositories;

import org.example.AngularSpring.models.Bike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface BikeRepository extends JpaRepository<Bike, BigInteger> {
}
