import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from './api.service';

export interface Asset {
  id?: string;
  organization?: string;
  asset_tag: string;
  name: string;
  description?: string;
  asset_type: 'hardware' | 'software' | 'license' | 'network' | 'other';
  category?: string;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  purchase_date?: string;
  purchase_cost?: number;
  warranty_expiration?: string;
  location?: string;
  status: 'active' | 'inactive' | 'maintenance' | 'retired' | 'disposed';
  assigned_to?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AssetCategory {
  id?: string;
  organization?: string;
  name: string;
  description?: string;
  asset_type: 'hardware' | 'software' | 'license' | 'network' | 'other';
  is_active?: boolean;
  created_at?: string;
}

export interface AssetFilters {
  status?: string;
  asset_type?: string;
  category?: string;
  assigned_to?: string;
  owner?: string;
  location?: string;
  manufacturer?: string;
  warranty_expiration?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  constructor(private apiService: ApiService) {}

  // Asset CRUD operations
  getAssets(filters?: AssetFilters): Observable<ApiResponse<Asset>> {
    return this.apiService.list<Asset>('assets', filters);
  }

  getAsset(id: string): Observable<Asset> {
    return this.apiService.get<Asset>(`assets/${id}`);
  }

  createAsset(asset: Asset): Observable<Asset> {
    return this.apiService.post<Asset>('assets/', asset);
  }

  updateAsset(id: string, asset: Partial<Asset>): Observable<Asset> {
    return this.apiService.put<Asset>(`assets/${id}/`, asset);
  }

  partialUpdateAsset(id: string, asset: Partial<Asset>): Observable<Asset> {
    return this.apiService.patch<Asset>(`assets/${id}/`, asset);
  }

  deleteAsset(id: string): Observable<void> {
    return this.apiService.delete<void>(`assets/${id}/`);
  }

  // Asset management
  assignAsset(id: string, userId: string): Observable<Asset> {
    return this.partialUpdateAsset(id, { assigned_to: userId });
  }

  unassignAsset(id: string): Observable<Asset> {
    return this.partialUpdateAsset(id, { assigned_to: undefined });
  }

  changeAssetStatus(id: string, status: string): Observable<Asset> {
    return this.partialUpdateAsset(id, { status: status as any });
  }

  retireAsset(id: string): Observable<Asset> {
    return this.partialUpdateAsset(id, { status: 'retired' });
  }

  disposeAsset(id: string): Observable<Asset> {
    return this.partialUpdateAsset(id, { status: 'disposed' });
  }

  setMaintenance(id: string): Observable<Asset> {
    return this.partialUpdateAsset(id, { status: 'maintenance' });
  }

  activateAsset(id: string): Observable<Asset> {
    return this.partialUpdateAsset(id, { status: 'active' });
  }

  // Asset Categories
  getCategories(): Observable<ApiResponse<AssetCategory>> {
    return this.apiService.list<AssetCategory>('asset-categories');
  }

  getCategory(id: string): Observable<AssetCategory> {
    return this.apiService.get<AssetCategory>(`asset-categories/${id}`);
  }

  createCategory(category: AssetCategory): Observable<AssetCategory> {
    return this.apiService.post<AssetCategory>('asset-categories/', category);
  }

  updateCategory(id: string, category: Partial<AssetCategory>): Observable<AssetCategory> {
    return this.apiService.put<AssetCategory>(`asset-categories/${id}/`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.apiService.delete<void>(`asset-categories/${id}/`);
  }

  // Utility methods
  getAssetTypeOptions() {
    return [
      { value: 'hardware', label: 'Hardware' },
      { value: 'software', label: 'Software' },
      { value: 'license', label: 'License' },
      { value: 'network', label: 'Network Equipment' },
      { value: 'other', label: 'Other' }
    ];
  }

  getStatusOptions() {
    return [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'maintenance', label: 'Under Maintenance' },
      { value: 'retired', label: 'Retired' },
      { value: 'disposed', label: 'Disposed' }
    ];
  }

  // Asset reporting methods
  getAssetsByType(): Observable<any> {
    return this.apiService.get<any>('assets/statistics/by-type/');
  }

  getAssetsByStatus(): Observable<any> {
    return this.apiService.get<any>('assets/statistics/by-status/');
  }

  getAssetsByLocation(): Observable<any> {
    return this.apiService.get<any>('assets/statistics/by-location/');
  }

  getWarrantyExpiring(days: number = 30): Observable<ApiResponse<Asset>> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    return this.getAssets({
      warranty_expiration: `${today.toISOString().split('T')[0]},${futureDate.toISOString().split('T')[0]}`
    });
  }
}