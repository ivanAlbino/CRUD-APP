CREATE DEFINER=`root`@`localhost` PROCEDURE `AddorEditItems`(
IN _Id int(11),
IN _Name varchar(200),
IN _Qty int(100),
IN _Amount int(11)
)
BEGIN
	IF _Id = 0 THEN
		INSERT INTO items(name,qty,amount)
		VALUES (_Name,_Qty,_Amount);
    
		SET _Id = LAST_INSERT_ID();
	ELSE 
		UPDATE items
        SET
			name = _Name,
            qty = _Qty,
            amount = _Amount
			WHERE id = _Id;
	END IF;
    
    SELECT _Id AS 'id';
END