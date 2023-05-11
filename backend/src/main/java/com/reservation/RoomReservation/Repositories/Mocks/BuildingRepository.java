package com.reservation.RoomReservation.Repositories.Mocks;

import com.reservation.RoomReservation.Models.Building;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public class BuildingRepository implements com.reservation.RoomReservation.Repositories.BuildingRepository {
    @Override
    public Optional<Building> findByName(String name) {
        return Optional.empty();
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends Building> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Building> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<Building> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> integers) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Building getOne(Integer integer) {
        return null;
    }

    @Override
    public Building getById(Integer integer) {
        return null;
    }

    @Override
    public Building getReferenceById(Integer integer) {
        return null;
    }

    @Override
    public <S extends Building> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Building> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Building> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Building> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Building> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Building> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Building, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Building> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Building> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Building> findById(Integer integer) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public List<Building> findAll() {
        return null;
    }

    @Override
    public List<Building> findAllById(Iterable<Integer> integers) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {

    }

    @Override
    public void delete(Building entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(Iterable<? extends Building> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Building> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<Building> findAll(Pageable pageable) {
        return null;
    }
}
