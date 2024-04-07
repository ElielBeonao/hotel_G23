-- 2 declencheurs de la question 6.
-- Trigger pour changer le statut des chambres selon que cette chambre est reservee ou non. si la reservation a un statut de 1 alors la chambre est indisponible sinon elle est disponible. On doit aussi creer une ligne de location pour la chambre si elle n;existe pas
CREATE OR REPLACE FUNCTION chambre_reservation_after_insert_func()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.statut_res = 1 THEN
        UPDATE chambre SET disponible_c = false WHERE id_c = NEW.id_c;
        IF NOT EXISTS (SELECT 1 FROM location WHERE id_c = NEW.id_c AND NEW.date_debut <= date_fin AND NEW.date_fin >= date_debut) THEN
            INSERT INTO location (id_c, date_debut, date_fin) VALUES (NEW.id_c, NEW.date_debut, NEW.date_fin);
        END IF;
    ELSE
        UPDATE chambre SET disponible_c = true WHERE id_c = NEW.id_c;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chambre_reservation_after_insert
AFTER INSERT ON reservation
FOR EACH ROW
EXECUTE FUNCTION chambre_reservation_after_insert_func();

-- Trigger pour changer le statut des chambres selon que cette chambre est reservee ou non.si la reservation existe deja alors on change les informations de la location qui est attachee a cette reservation. Si la reservation a le statut 2 alors c'est une annulation alors on supprime la location
-- Mettre à jour la location existante si la nouvelle réservation chevauche une location existante
-- Si aucune location existante n'a été mise à jour, en créer une nouvelle
-- Supprimer la location correspondante à la réservation annulée
-- Si aucune autre réservation n'existe pour la chambre, la marquer comme disponible
CREATE OR REPLACE FUNCTION chambre_reservation_after_update_func()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.statut_res = 1 THEN
        -- Mettre à jour la location existante si la nouvelle réservation chevauche une location existante
        UPDATE location
        SET date_debut = GREATEST(NEW.date_debut, date_debut),
            date_fin = LEAST(NEW.date_fin, date_fin)
        WHERE id_c = NEW.id_c
        AND NEW.date_debut <= date_fin
        AND NEW.date_fin >= date_debut;

        -- Si aucune location existante n'a été mise à jour, en créer une nouvelle
        IF NOT FOUND THEN
            INSERT INTO location (id_c, date_debut, date_fin, id_cli, id_emp) VALUES (NEW.id_c, NEW.date_debut, NEW.date_fin, NEW.id_cli, NEW.id_emp);
        END IF;

        UPDATE chambre SET disponible_c = false WHERE id_c = NEW.id_c;
    ELSIF NEW.statut_res = 2 THEN
        -- Supprimer la location correspondante à la réservation annulée
        DELETE FROM location WHERE id_c = NEW.id_c AND id_r = NEW.id_r;

        -- Si aucune autre réservation n'existe pour la chambre, la marquer comme disponible
        IF NOT EXISTS (SELECT 1 FROM reservation WHERE id_c = NEW.id_c AND statut_res = 1) THEN
            UPDATE chambre SET disponible_c = true WHERE id_c = NEW.id_c;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chambre_reservation_after_update
AFTER UPDATE ON reservation
FOR EACH ROW
EXECUTE FUNCTION chambre_reservation_after_update_func();


-- Creer 3 index sur les differentes tables location, reservation, et chambre => les indexes servent à ameliorer les performances des requetes. ca constitue une technique d'optimisation
CREATE INDEX location_id_ch ON location (id_c);
CREATE INDEX reservation_id_ch ON reservation (id_c);
CREATE INDEX reservation_statut_res ON reservation (statut_res);
CREATE INDEX chambre_disponible ON chambre (disponible_c);


-- (10%) L’utilisateur doit pouvoir également voir deux vues spécifiques. Vous devez
-- implémenter les vues en tant que vues SQL. Vue 1: la première vue est le nombre de
-- chambres disponibles par zone. Vue 2: la deuxième vue est la capacité de toutes les
-- chambres d’un hôtel spécifique.
CREATE VIEW total_chambre_disponible_adresse_view 
AS SELECT eh.adresse_eh, count(c) 
FROM public.chambre c INNER JOIN public.etablissement_hotelier eh ON eh.id_eh = c.id_eh 
WHERE c.disponible_c = TRUE GROUP BY eh.adresse_eh;

CREATE VIEW total_capacite_view 
SELECT eh.id_eh,
    c.intitule_c,
    count(*) AS count
   FROM chambre c
     JOIN etablissement_hotelier eh ON eh.id_eh = c.id_eh
  GROUP BY eh.id_eh, c.intitule_c;

