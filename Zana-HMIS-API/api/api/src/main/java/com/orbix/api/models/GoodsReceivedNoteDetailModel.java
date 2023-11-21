/**
 * 
 */
package com.orbix.api.models;

import com.orbix.api.domain.GoodsReceivedNote;
import com.orbix.api.domain.Item;

import lombok.Data;

/**
 * @author Godfrey
 *
 */
@Data
public class GoodsReceivedNoteDetailModel {
	public Long id = null;
	public Item item = null;
	public double orderedQty = 0;
	public double receivedQty = 0;
	
	public GoodsReceivedNote goodsReceivedNote = null;
	
	public String created;
}
