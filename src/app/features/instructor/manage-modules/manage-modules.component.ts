import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesService, ActivationsService } from '@/app/core/services';

@Component({
  selector: 'app-manage-modules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-modules.component.html',
  styleUrls: ['./manage-modules.component.scss'],
})
export class ManageModulesComponent implements OnInit {
  modules: any[] = [];
  activations: Record<number, any[]> = {};

  async ngOnInit() {
    const res = await ModulesService.list();
    this.modules = res?.data || [];
    for (const m of this.modules) {
      const a = await ActivationsService.listByModule(m.id);
      this.activations[m.id] = a?.data || [];
    }
  }

  async activate(moduleId: number, groupName: string) {
    await ActivationsService.activate(moduleId, groupName);
    const a = await ActivationsService.listByModule(moduleId);
    this.activations[moduleId] = a?.data || [];
  }

  async deactivate(moduleId: number, groupName: string) {
    await ActivationsService.deactivate(moduleId, groupName);
    const a = await ActivationsService.listByModule(moduleId);
    this.activations[moduleId] = a?.data || [];
  }
}


